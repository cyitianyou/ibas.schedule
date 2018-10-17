/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../index.d.ts" />
import { emScheduleStatus } from "../api/index";
import { Schedule, ScheduleEvents } from "../schedule/index";
import Loader from "../loader/index";
import { OperationResult, OperationInformation, OperationMessage } from "./OperationResult";
import { DataConverter4js, IDataConverter } from "./DataConverter";
import Service, { IMethodCaller } from "./Service";
export default class DataService extends Service implements IDataService {
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
            if (this.scheduleStatus === emScheduleStatus.UNINITIALIZED) {
                let config: Config = require("../config");
                let loader: Loader = new Loader();
                loader.noCache = true;
                loader.minLibrary = true;
                loader.user = config.appSettings.defaultUser;
                loader.password = config.appSettings.defaultPassword;
                process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
                let stratTime: Date = new Date();
                loader.run(url).then(() => {
                    let endTime: Date = new Date();
                    console.log(ibas.strings.format("加载vstore花费时间{0}秒",
                        ibas.dates.difference(ibas.dates.emDifferenceType.SECOND, endTime, stratTime)));
                    let schedule: Schedule = new Schedule();
                    global.window._schedule = schedule;
                    schedule.emit(ScheduleEvents.START);
                });
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
            if (this.scheduleStatus >= emScheduleStatus.SUSPENDED) {
                // 定时器已初始化
                let state: boolean = caller.body.suspend;
                if (!state) {
                    opRslt.resultCode = 400;
                    throw new Error("参数错误:post实体中不包含suspend属性");
                }
                (<Schedule>global.window._schedule).emit(ScheduleEvents.SUSPEND, state);
            } else {
                // 定时器未初始化或正在初始化
                if (this.scheduleStatus === emScheduleStatus.UNINITIALIZED) {
                    throw new Error("定时器未初始化,不能执行此操作.");
                } else if (this.scheduleStatus === emScheduleStatus.INITIALIZING) {
                    throw new Error("定时器正在初始化,不能执行此操作.");
                }
            }
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
    public async reset(caller: IMethodCaller): Promise<OperationResult<string>> {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            if (this.scheduleStatus >= emScheduleStatus.SUSPENDED) {
                // 定时器已初始化
                (<Schedule>global.window._schedule).emit(ScheduleEvents.RESET);
            } else {
                // 定时器未初始化或正在初始化
                if (this.scheduleStatus === emScheduleStatus.UNINITIALIZED) {
                    throw new Error("定时器未初始化,不能执行此操作.");
                } else if (this.scheduleStatus === emScheduleStatus.INITIALIZING) {
                    throw new Error("定时器正在初始化,不能执行此操作.");
                }
            }
        } catch (e) {
            opRslt.resultCode = opRslt.resultCode === 0 ? -1 : opRslt.resultCode;
            opRslt.message = e.message;
        }
        return opRslt;
    }
}
export interface IDataService {
    showStatus(caller: IMethodCaller): Promise<OperationResult<string>>;
    start(caller: IMethodCaller): Promise<OperationResult<string>>;
    suspend(caller: IMethodCaller): Promise<OperationResult<string>>;
    reset(caller: IMethodCaller): Promise<OperationResult<string>>;
}