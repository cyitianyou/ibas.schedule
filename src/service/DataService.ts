/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../index.d.ts" />
import { emScheduleStatus } from "../api/index";
import { Schedule, ScheduleEvents, TaskAction } from "../schedule/index";
import Loader from "../loader/index";
import { OperationResult, OperationInformation, OperationMessage } from "./OperationResult";
import { DataConverter4js, IDataConverter } from "./DataConverter";
import Service, { IMethodCaller } from "./Service";
import { IRouterContext } from "koa-router";
export default class DataService extends Service implements IDataService {
    public async callMethod(ctx: IRouterContext): Promise<void> {
        let that: this = this;
        let method: string = ctx.params.method;
        if (!method || typeof this[method] !== "function"
            || method === this.checkStatus.name) {
            ctx.throw(404);
            return;
        }
        let opRslt: OperationResult<any> = await (<Function>this[method]).call(this, {
            query: ctx.request.query,
            body: ctx.request.body
        });
        if (opRslt.resultCode <= 0) {
            // 负数和0返回前台处理
            ctx.response.body = await that.converter.convert(opRslt, method);
        } else {
            // 正数服务端处理,如抛出500错误
            ctx.throw(opRslt.resultCode, opRslt.message);
        }
    }
    protected get converter(): IDataConverter {
        return new DataConverter4js();
    }
    public async showStatus(caller: IMethodCaller): Promise<OperationResult<string>> {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            opRslt.addResults(emScheduleStatus[this.scheduleStatus]);
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
    public async start(caller: IMethodCaller): Promise<OperationResult<string>> {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            let url: string = caller.query.url;
            let token: string = caller.query.token;
            if (this.scheduleStatus === emScheduleStatus.UNINITIALIZED) {
                let loader: Loader = new Loader();
                loader.noCache = true;
                loader.minLibrary = false;
                if (!!token) {
                    loader.token = token;
                }
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                let stratTime: Date = new Date();
                loader.run(url).then(() => {
                    if (!global.window) {
                        return;
                    }
                    let endTime: Date = new Date();
                    console.log(ibas.strings.format("加载vstore花费时间{0}秒",
                        ibas.dates.difference(ibas.dates.emDifferenceType.SECOND, endTime, stratTime)));
                    let schedule: Schedule = new Schedule();
                    global.window._schedule = schedule;
                    schedule.emit(ScheduleEvents.START);
                });
                opRslt.addResults(emScheduleStatus[emScheduleStatus.INITIALIZING]);
            } else {
                opRslt.addResults(emScheduleStatus[this.scheduleStatus]);
            }
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
    public async suspend(caller: IMethodCaller): Promise<OperationResult<string>> {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            this.checkStatus();
            // 定时器已初始化
            let state: boolean = true;
            if (caller.query.suspend === "false") {
                state = false;
            }
            (<Schedule>global.window._schedule).emit(ScheduleEvents.SUSPEND, state);
            opRslt.addResults(emScheduleStatus[this.scheduleStatus]);
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
    public async reset(caller: IMethodCaller): Promise<OperationResult<string>> {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            this.checkStatus();
            (<Schedule>global.window._schedule).emit(ScheduleEvents.RESET);
            opRslt.addResults(emScheduleStatus[this.scheduleStatus]);
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
    public async fetchTaskAction(caller: IMethodCaller): Promise<OperationResult<TaskAction>> {
        let opRslt: OperationResult<TaskAction> = new OperationResult<TaskAction>();
        try {
            this.checkStatus();
            opRslt.addResults((<Schedule>global.window._schedule).jobs);
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
}
export interface IDataService {
    /** 查看定时器状态 */
    showStatus(caller: IMethodCaller): Promise<OperationResult<string>>;
    /** 启动定时器 */
    start(caller: IMethodCaller): Promise<OperationResult<string>>;
    /** 暂停/恢复定时器 */
    suspend(caller: IMethodCaller): Promise<OperationResult<string>>;
    /** 重置定时器 */
    reset(caller: IMethodCaller): Promise<OperationResult<string>>;
    /** 查询任务列表 */
    fetchTaskAction(caller: IMethodCaller): Promise<OperationResult<TaskAction>>;
}