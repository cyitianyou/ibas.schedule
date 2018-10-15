/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
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
                if (opRslt.resultCode === 0) {
                    ctx.response.body = that.converter.convert(opRslt, method);
                } else {
                    ctx.throw(opRslt.resultCode, opRslt.message);
                }
            }
        });
    }
}
export interface IMethodCaller<P> {
    /** get参数对象 */
    query: any;
    /** post消息主体 */
    body: any;
    onComplete(opRslt: IOperationResult<P>): void;
}