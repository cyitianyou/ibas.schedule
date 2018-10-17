/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

import { emScheduleStatus } from "../api/index";
import { IRouterContext } from "koa-router";
import { IDataConverter } from "./DataConverter";
export default abstract class Service {
    public abstract async callMethod(ctx: IRouterContext): Promise<void>;
    get scheduleStatus(): emScheduleStatus {
        if (!global.window) {
            return emScheduleStatus.UNINITIALIZED;
        } else if (!global.window._schedule) {
            return emScheduleStatus.INITIALIZING;
        } else if (!global.window._schedule.activated) {
            return emScheduleStatus.SUSPENDED;
        } else {
            return emScheduleStatus.RUNNING;
        }
    }
    /** 检查定时器状态,未初始化成功不能执行某些操作 */
    protected checkStatus(): void {
        if (this.scheduleStatus < emScheduleStatus.SUSPENDED) {
            // 定时器未初始化或正在初始化
            if (this.scheduleStatus === emScheduleStatus.UNINITIALIZED) {
                throw new Error("定时器未初始化,不能执行此操作.");
            } else if (this.scheduleStatus === emScheduleStatus.INITIALIZING) {
                throw new Error("定时器正在初始化,不能执行此操作.");
            }
        }
    }
}
export interface IMethodCaller {
    /** get参数对象 */
    query: any;
    /** post消息主体 */
    body: any;
}