/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/shell.d.ts" />
import Loader from "../loader/index";
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
        let loader: any = new Loader();
        loader.noCache = false;
        loader.minLibrary = false;
        loader.user = user;
        loader.password = password;
        loader.run(root, function (): void {
            that.fireInitialized();
        });
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