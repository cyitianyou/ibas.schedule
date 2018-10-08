/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/shell.d.ts" />
/** 定时器 */
export class Schedule {
    constructor() {
        this.status = ScheduleStatus.UNINITIALIZED;
    }
    /** 状态 */
    status: ScheduleStatus;
    /** 初始化 */
    public initialize(root: string, user: string, password: string): void {
        this.status = ScheduleStatus.INITIALIZING;
        let that: this = this;
        let Loader: any = require("../loader/index");
        let loader: any = new Loader();
        loader.noCache = false;
        loader.minLibrary = false;
        loader.run(root, function (): void {
            that.login(user, password);
        });
    }
    /** 登录系统 */
    private login(user: string, password: string): void {
        ibas.logger.log(ibas.emMessageLevel.DEBUG, "app: user [{0}] login system.", user);
        let boRepository: shell.bo.IBORepositoryShell = shell.bo.repository.create();
        boRepository.userConnect({
            caller: this, // 设置调用者，则onCompleted修正this
            user: user,
            password: password,
            onCompleted: this.onConnectCompleted,
        });
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
                    // console.run();
                },
                onAllConsoleCompleted(): void {
                    that.fireInitialized();
                }
            });
        } catch (error) {
            ibas.logger.log(error.message);
        }
    }
    /** 初始化完成，需要手工调用 */
    protected fireInitialized(): void {
        this.status = ScheduleStatus.INITIALIZED;
        if (!this.listeners) {
            return;
        }
        for (let listener of this.listeners) {
            if (listener instanceof Function) {
                listener.call(listener, this);
            }
        }
        // 清除监听
        delete (this.listeners);
    }
    private listeners: Array<Function>;
    /** 添加初始化完成监听 */
    addListener(listener: Function): void {
        if (!this.listeners) {
            this.listeners = new Array<Function>();
        }
        this.listeners.push(listener);
    }
    /** 运行 */
    run(): void {
        //
    }
}
export enum ScheduleStatus {
    /** 未初始化 */
    UNINITIALIZED,
    /** 正在初始化 */
    INITIALIZING,
    /** 初始化完成 */
    INITIALIZED
}
module.exports = Schedule;