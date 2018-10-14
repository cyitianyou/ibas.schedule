/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/integration.d.ts" />
import { getJobLogger } from "../logger/index";
import TaskAction from "./TaskAction";
import { EventEmitter } from "events";
/** 定时器 */
export class Schedule extends EventEmitter {
    private activated: boolean = true;
    private jobs: ibas.ArrayList<TaskAction>;
    public reset(): void {
        this.emit(ScheduleEvents.RESET);
        this.start();
    }
    public suspend(suspend: boolean): void {
        if (suspend === true) {
            this.activated = false;
        } else {
            this.activated = true;
        }
        this.emit(ScheduleEvents.SUSPEND, this.activated);
    }
    public start(): void {
        this.emit(ScheduleEvents.START);
        let criteria: ibas.ICriteria = new ibas.Criteria();
        let condition: ibas.ICondition = criteria.conditions.create();
        condition.alias = integration.bo.IntegrationJob.PROPERTY_ACTIVATED_NAME;
        condition.value = ibas.emYesNo.YES.toString();
        condition = criteria.conditions.create();
        condition.alias = integration.bo.IntegrationJob.PROPERTY_DATAOWNER_NAME;
        condition.value = ibas.variablesManager.getValue(ibas.VARIABLE_NAME_USER_ID);
        condition = criteria.conditions.create();
        condition.alias = integration.bo.IntegrationJob.PROPERTY_FREQUENCY_NAME;
        condition.operation = ibas.emConditionOperation.GRATER_THAN;
        condition.value = "0";
        let that: this = this;
        let boRepository: integration.bo.BORepositoryIntegration = new integration.bo.BORepositoryIntegration();
        boRepository.fetchIntegrationJob({
            criteria: criteria,
            onCompleted(opRslt: ibas.IOperationResult<integration.bo.IntegrationJob>): void {
                try {
                    if (opRslt.resultCode !== 0) {
                        throw new Error(opRslt.message);
                    }
                    let jobs: ibas.ArrayList<TaskAction> = new ibas.ArrayList<TaskAction>();
                    let builder: ibas.StringBuilder = new ibas.StringBuilder();
                    builder.append("\n");
                    builder.append("(");
                    for (let item of opRslt.resultObjects) {
                        if (item.integrationJobActions.length === 0) {
                            continue;
                        }
                        let task: TaskAction = new TaskAction();
                        task.job = item;
                        task.id = task.job.toString();
                        task.name = task.job.name;
                        task.activated = true;
                        task.setLogger(getJobLogger(task.id));
                        task.onRun = function (): void {
                            that.emit(ScheduleEvents.RUNTASK, this);
                        };
                        task.onDone = function (): void {
                            that.emit(ScheduleEvents.RUNTASKCOMPLETED, this);
                        };
                        jobs.add(task);
                        if (builder.length > 2) {
                            builder.append(",");
                        }
                        builder.append(task.job.name);
                    }
                    builder.append(")");
                    that.jobs = jobs;
                    if (that.jobs.length > 0) {
                        setInterval(function (): void {
                            if (!that.activated) {
                                return;
                            }
                            for (let item of that.jobs) {
                                item.do();
                            }
                        }, 10000);
                    } else {
                        // todo: 没有任务提示
                    }
                    that.emit(ScheduleEvents.STARTED, that.jobs);
                } catch (error) {
                    // todo: 查询出错提示
                }
            }
        });
    }
}
export const ScheduleEvents: any = {
    /** 启动 */
    START: "start",
    /** 启动完成 */
    STARTED: "started",
    /** 暂停 */
    SUSPEND: "suspend",
    /** 重置 */
    RESET: "reset",
    /** 执行任务 */
    RUNTASK: "runTask",
    /** 执行任务完成 */
    RUNTASKCOMPLETED: "runTaskCompleted",
};