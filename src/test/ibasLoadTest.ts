/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas.d.ts" />
import { Schedule } from "../schedule/Sehedule";
var schedule: any = new Schedule();
schedule.addListener(function (): void {
    ibas.servicesManager.viewShower = function (): any {
        return {
            /** 显示视图 */
            show(view: ibas.IView): void {
                //
            },
            /** 清理资源 */
            destroy(view: ibas.IView): void {
                //
            },
            /** 设置忙状态 */
            busy(view: ibas.IView, busy: boolean, msg: string): void {
                //
            },
            /** 进程消息 */
            proceeding(view: ibas.IView, type: ibas.emMessageType, msg: string): void {
                console.log(ibas.enums.describe(ibas.emMessageType, type) + ":" + msg);
            },
            /** 对话消息 */
            messages(caller: ibas.IMessgesCaller): void {
                console.log(ibas.enums.describe(ibas.emMessageType, caller.type) + ":" + caller.message);
            },
        };
    };
    (<any>global).ibas.servicesManager.runApplicationService({
        proxy: new (<any>global).integration.app.IntegrationJobServiceProxy({
            jobName: "HelloWorld",
            autoRun: true,
        }),
    });
});
schedule.initialize("http://localhost:15386/", "admin", "1q2w3e");