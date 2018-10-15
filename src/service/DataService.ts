/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../index.d.ts" />
import { OperationResult, OperationInformation, OperationMessage } from "./OperationResult";
import { DataConverter4js, IDataConverter } from "./DataConverter";
import Service, { IMethodCaller } from "./Service";
export default class DataService extends Service {
    protected get converter(): IDataConverter {
        return new DataConverter4js();
    }
    public showSeheduleStatus(caller: IMethodCaller<string>): void {
        let opRslt: OperationResult<string> = new OperationResult<string>();
        try {
            let url: string = caller.query.url;
            if (!global.window
                || global.window.document.URL !== url) {
                opRslt.addResults("UN");
            }
            caller.onComplete(opRslt);
        } catch (e) {
            opRslt.resultCode = 400;
            opRslt.message = e.message;
        }

    }

}