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
import { IOperationResult } from "./OperationResult";
export default abstract class Service {
    protected abstract get converter(): IDataConverter;
    public callMethod(ctx: IRouterContext): void {
        let that: this = this;
        let method: string = ctx.params.method;
        if (!method || typeof this[method] !== "function") {
            ctx.throw(404);
            return;
        }
        (<Function>this[method]).call(this, {
            query: ctx.request.query,
            body: ctx.request.body,
            onComplete(opRslt: IOperationResult<any>): void {
                if (opRslt.resultCode <= 0) {
                    // 负数和0返回前台处理
                    ctx.response.body = that.converter.convert(opRslt, method);
                } else {
                    // 正数服务端处理,如抛出500错误
                    ctx.throw(opRslt.resultCode, opRslt.message);
                }
            }
        });
    }
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
}
export interface IMethodCaller<P> {
    /** get参数对象 */
    query: any;
    /** post消息主体 */
    body: any;
    onComplete(opRslt: IOperationResult<P>): void;
}