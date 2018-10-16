/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/shell.d.ts" />
export interface IModuleConsoleLoader {
    /** 用户 */
    user: string;
    /** 平台 */
    platform: string;
    /** 运行消息 */
    onStatusMessage(type: ibas.emMessageType, message: string): void;
    /**
     * 发生错误
     * @param error 错误
     */
    onError(error: Error): void;
    /**
     * 完成
     * @param console 控制台
     */
    onCompleted(console: ibas.ModuleConsole): void;
}
const PROPERTY_CONSOLES: symbol = Symbol("consoles");
export class ModuleConsoleManager {
    modules(): ibas.IModule[] {
        let modules: ibas.IList<ibas.IModule> = new ibas.ArrayList<ibas.IModule>();
        if (ibas.objects.isNull(this[PROPERTY_CONSOLES])) {
            return modules;
        }
        for (let item of this[PROPERTY_CONSOLES]) {
            modules.add(item);
        }
        return modules;
    }
    async load(loader: IModuleConsoleLoader): Promise<void> {
        let that: this = this;
        let promise: Promise<void> = new Promise<void>(resolve => {
            this[PROPERTY_CONSOLES] = new ibas.ArrayList<ibas.IModuleConsole>();
            let that: this = this;
            let boRepository: shell.bo.IBORepositoryShell = shell.bo.repository.create();
            boRepository.fetchUserModules({
                user: loader.user,
                platform: loader.platform,
                onCompleted: function (opRslt: ibas.IOperationResult<shell.bo.IUserModule>): void {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        // 去除重复模块
                        let userModules: ibas.ArrayList<shell.bo.IUserModule> = new ibas.ArrayList<shell.bo.IUserModule>();
                        for (let item of opRslt.resultObjects) {
                            if (userModules.firstOrDefault(c => c.id === item.id) !== null) {
                                continue;
                            }
                            userModules.add(item);
                        }
                        let promises: ibas.ArrayList<Promise<ibas.ModuleConsole>> = new ibas.ArrayList<Promise<ibas.ModuleConsole>>();
                        for (let module of userModules) {
                            loader.onStatusMessage(
                                ibas.emMessageType.INFORMATION,
                                ibas.i18n.prop("shell_initialize_module", ibas.strings.isEmpty(module.name) ? module.id : module.name)
                            );
                            // 补充模块初始值
                            if (ibas.objects.isNull(module.authorise)) {
                                module.authorise = ibas.emAuthoriseType.ALL;
                            }
                            // 模块入口地址
                            if (ibas.strings.isEmpty(module.address)) {
                                // 模块地址无效，不再加载
                                loader.onStatusMessage(ibas.emMessageType.WARNING,
                                    ibas.i18n.prop("shell_invalid_module_address", module.name));
                                continue;
                            }
                            module.address = ibas.urls.normalize(module.address);
                            if (!module.address.endsWith("/")) {
                                module.address += "/";
                            }
                            // 模块索引文件
                            if (ibas.strings.isEmpty(module.index)) {
                                module.index = "index";
                            }
                            // 模块控制台名称
                            if (ibas.strings.isEmpty(module.console)) {
                                module.console = "Console";
                            }
                            // 模块require函数
                            let minLibrary: boolean = ibas.config.get(ibas.CONFIG_ITEM_USE_MINIMUM_LIBRARY, false);
                            promises.add(new Promise<ibas.ModuleConsole>(resolve => {
                                let require: Require = ibas.requires.create({
                                    context: ibas.requires.naming(module.name),
                                    baseUrl: module.address,
                                    map: {
                                        "*": {
                                            "css": ibas.strings.format("{0}/3rdparty/require-css{1}.js",
                                                ibas.urls.rootUrl("/ibas/index"),
                                                (minLibrary ? ibas.SIGN_MIN_LIBRARY : "")
                                            )
                                        }
                                    },
                                    waitSeconds: ibas.config.get(ibas.requires.CONFIG_ITEM_WAIT_SECONDS, 30)
                                });
                                require([
                                    module.index + (minLibrary ? ibas.SIGN_MIN_LIBRARY : "")
                                ], function (): void {
                                    try {
                                        // 加载模块的控制台（可能多个）
                                        for (let item of module.console.split(ibas.DATA_SEPARATOR)) {
                                            if (ibas.strings.isEmpty(item)) {
                                                continue;
                                            }
                                            item = item.trim();
                                            if (item.indexOf(".") < 0) {
                                                // 没有命名空间，补全
                                                item = ibas.strings.format("{0}.app.{1}", module.name.toLowerCase(), item);
                                            }
                                            let consoleClass: any = window;
                                            for (let tmp of item.split(".")) {
                                                if (ibas.objects.isNull(consoleClass)) {
                                                    break;
                                                }
                                                consoleClass = consoleClass[tmp];
                                            }
                                            if (!ibas.objects.isAssignableFrom(consoleClass, ibas.ModuleConsole)) {
                                                throw new TypeError(item);
                                            }
                                            let console: ibas.ModuleConsole = new consoleClass();
                                            if (!(ibas.objects.instanceOf(console, ibas.ModuleConsole))) {
                                                throw new ReferenceError(item);
                                            }
                                            // 设置模块名称
                                            console.module = module.name.toLowerCase();
                                            // 设置模块根地址
                                            console.rootUrl = module.address;
                                            // 设置仓库地址
                                            if (!ibas.strings.isEmpty(module.repository)) {
                                                let done: boolean = console.setRepository(module.repository);
                                                // 注册模块业务仓库默认地址，创建实例时默认取此地址
                                                if (!ibas.objects.isNull(console.name) && done) {
                                                    module.repository = ibas.urls.normalize(module.repository);
                                                    // tslint:disable-next-line:max-line-length
                                                    let repositoryName: string = ibas.strings.format(ibas.MODULE_REPOSITORY_NAME_TEMPLATE, console.name);
                                                    let configName: string = ibas.strings.format(
                                                        ibas.CONFIG_ITEM_TEMPLATE_REMOTE_REPOSITORY_ADDRESS, repositoryName);
                                                    ibas.config.set(configName, module.repository);
                                                    ibas.logger.log(ibas.emMessageLevel.DEBUG,
                                                        // tslint:disable-next-line:max-line-length
                                                        "repository: register [{0}]'s default address [{1}].", repositoryName, module.repository);
                                                }
                                            }
                                            that[PROPERTY_CONSOLES].add(console);
                                            loader.onCompleted(console);
                                            resolve(console);
                                        }
                                    } catch (error) {
                                        loader.onStatusMessage(ibas.emMessageType.ERROR, error.message);
                                        resolve(undefined);
                                    }
                                }, function (): void {
                                    // 模块加载失败
                                    loader.onStatusMessage(
                                        ibas.emMessageType.ERROR,
                                        ibas.i18n.prop("shell_invalid_module_index",
                                            ibas.objects.isNull(module.name) ? module.id : module.name)
                                    );
                                    resolve(undefined);
                                });
                                ibas.logger.log(ibas.emMessageLevel.DEBUG,
                                    "center: module [{0}] {root: [{1}], index: [{2}]}.", module.name, module.address, module.index);
                            }));
                        }
                        Promise.all(promises).then(resultList => {
                            resolve();
                        }).catch((error) => {
                            resolve();
                        });
                    } catch (error) {
                        loader.onError(error);
                    }
                }
            });
        });
        return promise;
    }
}
module.exports = ModuleConsoleManager;