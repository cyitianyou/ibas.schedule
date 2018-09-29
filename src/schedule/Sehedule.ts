/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/** 定时器 */
export class Schedule {
    constructor() {
        //
    }
    private listeners: Array<Function>;
    /** 添加初始化完成监听 */
    addListener(listener: Function): void {
        if (!this.listeners) {
            this.listeners = new Array<Function>();
        }
        this.listeners.push(listener);
    }
    /** 初始化完成 */
    isInitialized: boolean;
    /** 初始化 */
    protected initialize(): void {
        this.registers();
        this.fireInitialized();
    }
    /** 初始化完成，需要手工调用 */
    protected fireInitialized(): void {
        this.isInitialized = true;
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
    /** 运行 */
    run(): void {
        //
    }
}