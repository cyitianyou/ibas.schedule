/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../index.d.ts" />
import { Schedule } from "../schedule/Sehedule";
import Loader from "../loader/index";
import { OperationResult, OperationInformation, OperationMessage } from "./OperationResult";
import { DataConverter4js, IDataConverter } from "./DataConverter";
import Service, { IMethodCaller } from "./Service";
export default class DataService extends Service {
    protected get converter(): IDataConverter {
        return new DataConverter4js();
    }
    public startSehedule(caller: IMethodCaller<string>): void {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            let url: string = caller.query.url;
            let config: Config = require("../config");
            let loader: Loader = new Loader();
            loader.noCache = true;
            loader.minLibrary = true;
            loader.user = config.appSettings.defaultUser;
            loader.password = config.appSettings.defaultPassword;
            process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
            let stratTime: Date = new Date();
            loader.run(url, function (): void {
                let endTime: Date = new Date();
                console.log(ibas.strings.format("加载vstore花费时间{0}秒",
                    ibas.dates.difference(ibas.dates.emDifferenceType.SECOND, endTime, stratTime)));
                let schedule: Schedule = new Schedule();
                schedule.start();
            });
        } catch (e) {
            opRslt.resultCode = 400;
            opRslt.message = e.message;
        }
        caller.onComplete(opRslt);
    }

}