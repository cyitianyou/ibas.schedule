/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/shell.d.ts" />
class ModuleConsolesLoader {
    private caller: IUserConnectCaller | ITokenConnectCaller;
    /** 登录系统 */
    public login(caller: IUserConnectCaller | ITokenConnectCaller): void {
        this.caller = caller;
        let boRepository: shell.bo.IBORepositoryShell = shell.bo.repository.create();
        if (!(<ITokenConnectCaller>this.caller).token) {
            let userConnectCaller: IUserConnectCaller = <IUserConnectCaller>this.caller;
            ibas.logger.log(ibas.emMessageLevel.DEBUG, "app: user [{0}] login system.", userConnectCaller.user);
            boRepository.userConnect({
                caller: this, // 设置调用者，则onCompleted修正this
                user: userConnectCaller.user,
                password: userConnectCaller.password,
                onCompleted: this.onConnectCompleted,
            });
        } else {
            let tokenConnectCaller: ITokenConnectCaller = <ITokenConnectCaller>this.caller;
            ibas.logger.log(ibas.emMessageLevel.DEBUG, "app: user with token [{0}] login system.", tokenConnectCaller.token);
            boRepository.tokenConnect({
                caller: this, // 设置调用者，则onCompleted修正this
                token: tokenConnectCaller.token,
                onCompleted: this.onConnectCompleted,
            });
        }
    }
    private onConnectCompleted(opRslt: ibas.IOperationResult<shell.bo.IUser>): void {
        try {
            let that: this = this;
            if (ibas.objects.isNull(opRslt)) {
                throw new Error();
            }
            if (opRslt.resultCode !== 0) {
                throw new Error(opRslt.message);
            }
            let user: shell.bo.IUser = opRslt.resultObjects.firstOrDefault();
            // 设置默认用户口令
            ibas.config.set(ibas.CONFIG_ITEM_USER_TOKEN, user.token);
            // 更新配置项目
            for (let item of opRslt.informations) {
                if (ibas.strings.equalsIgnoreCase(item.tag, "CONFIG_ITEM")) {
                    if (ibas.strings.equalsIgnoreCase(item.name, ibas.CONFIG_ITEM_COMPANY)) {
                        // 设置公司代码
                        ibas.config.set(ibas.CONFIG_ITEM_COMPANY, item.content);
                    }
                    if (ibas.strings.equalsIgnoreCase(item.name, ibas.CONFIG_ITEM_APPROVAL_WAY)) {
                        // 设置审批方法
                        ibas.config.set(ibas.CONFIG_ITEM_APPROVAL_WAY, item.content);
                    }
                    if (ibas.strings.equalsIgnoreCase(item.name, ibas.CONFIG_ITEM_ORGANIZATION_WAY)) {
                        // 设置组织方式
                        ibas.config.set(ibas.CONFIG_ITEM_ORGANIZATION_WAY, item.content);
                    }
                    if (ibas.strings.equalsIgnoreCase(item.name, ibas.CONFIG_ITEM_OWNERSHIP_WAY)) {
                        // 设置权限判断方式
                        ibas.config.set(ibas.CONFIG_ITEM_OWNERSHIP_WAY, item.content);
                    }
                }
            }
            // 注册运行变量
            ibas.variablesManager.register(ibas.VARIABLE_NAME_USER_ID, user.id);
            ibas.variablesManager.register(ibas.VARIABLE_NAME_USER_CODE, user.code);
            ibas.variablesManager.register(ibas.VARIABLE_NAME_USER_NAME, user.name);
            ibas.variablesManager.register(ibas.VARIABLE_NAME_USER_SUPER, user.super);
            ibas.variablesManager.register(ibas.VARIABLE_NAME_USER_BELONG, user.belong);
            ibas.variablesManager.register(ibas.VARIABLE_NAME_USER_TOKEN, user.token);
            // 加载所有模块
            let ConsoleManager: any = require("./ModuleConsoleManager");
            let consoleManager: any = new ConsoleManager();
            consoleManager.load({
                user: user.code,
                platform: ibas.enums.toString(ibas.emPlantform, ibas.emPlantform.COMBINATION),
                onError(error: Error): void {
                    console.log(error);
                },
                onStatusMessage(type: ibas.emMessageType, message: string): void {
                    console.log(message);
                },
                onCompleted(console: ibas.ModuleConsole): void {
                    // 有效模块控制台
                    console.addListener(function (): void {
                        // 处理服务
                        for (let service of console.services()) {
                            ibas.servicesManager.register(service);
                        }
                        // 注册元素描述
                        ibas.i18n.add(console.id, console.description);
                        for (let item of console.elements()) {
                            ibas.i18n.add(item.id, item.description);
                        }
                    });
                    console.run();
                },
                onAllConsoleCompleted(): void {
                    if (!!that.caller.caller) {
                        that.caller.onCompleted.call(that.caller.caller);
                    } else {
                        that.caller.onCompleted();
                    }
                }
            });
        } catch (error) {
            ibas.logger.log(error.message);
        }
    }
}
/**
 * 登录调用者
 */
export interface IConnectCaller {
    /** 调用者，若设置值，则为onCompleted方法的this */
    caller?: any;
    /**
     * 调用完成
     */
    onCompleted(): void;
}
/**
 * 用户密码登录调用者
 */
export interface IUserConnectCaller extends IConnectCaller {
    /** 用户 */
    user: string;
    /** 密码 */
    password: string;
}
/**
 * 用户口令登录调用者
 */
export interface ITokenConnectCaller extends IConnectCaller {
    /** 口令 */
    token: string;
}
export default ModuleConsolesLoader;