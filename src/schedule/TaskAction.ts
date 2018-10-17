/// <reference path="../3rdparty/integration.d.ts" />
/// <reference path="../3rdparty/ibas.d.ts" />
import { Logger } from "../../node_modules/log4js/types/log4js";
import { JOB_LOGGER_PROPERTY } from "../logger/index";
import Action from "./Action";
/** 任务动作 */
export default class TaskAction extends Action {
    /** 工作 */
    job: integration.bo.IntegrationJob;
    /** 上次运行时间 */
    lastRunTime: number;
    /** 激活的 */
    activated: boolean;
    /** 日志者 */
    ibasLogger: ibas.ILogger;
    logger: Logger;
    /** 设置日志记录者 */
    setLogger(logger: ibas.ILogger): void;
    setLogger(logger: Logger): void;
    setLogger(): void {
        let logger: Logger = arguments[0];
        if (!!logger.isLevelEnabled) {
            this.logger = logger;
            this.ibasLogger = {
                level: ibas.config.get(ibas.CONFIG_ITEM_MESSAGES_LEVEL, ibas.emMessageLevel.INFO, ibas.emMessageLevel),
                log(): void {
                    let tmpArgs: Array<any> = new Array();
                    for (let item of arguments) {
                        tmpArgs.push(item);
                    }
                    ibas.logger.log.apply(ibas.logger, tmpArgs);
                    let message: string;
                    let type: ibas.emMessageType = ibas.emMessageType.INFORMATION;
                    if (typeof (tmpArgs[0]) === "number" && tmpArgs.length > 1) {
                        type = integration.bo.DataConverter.toMessageType(tmpArgs[0]);
                        message = ibas.strings.format(tmpArgs[1], tmpArgs.slice(2));
                    } else if (typeof (tmpArgs[0]) === "string") {
                        message = ibas.strings.format(tmpArgs[0], tmpArgs.slice(1));
                    }
                    switch (type) {
                        case ibas.emMessageType.WARNING:
                            logger.warn(message);
                            break;
                        case ibas.emMessageType.ERROR:
                            logger.error(message);
                            break;
                        case ibas.emMessageType.INFORMATION:
                        case ibas.emMessageType.SUCCESS:
                        default:
                            logger.info(message);
                            break;
                    }
                }
            };
        } else {
            this.ibasLogger = <any>logger;
        }
        super.setLogger(this.ibasLogger);
    }
    /** 日志目录 */
    get logDir(): string {
        let appConfig: Config = require("../config");
        if (!appConfig.appSettings.logDir.endsWith("/")) {
            appConfig.appSettings.logDir += "/";
        }
        return appConfig.appSettings.logDir + this.id;
    }
    /** 进行 */
    do(): void {
        // 未激活
        if (!this.activated) {
            return;
        }
        // 正在运行
        if (this.isRunning()) {
            return;
        }
        // 尚未到循环周期
        if (ibas.dates.now().getTime() < (this.lastRunTime + this.job.frequency * 1000)) {
            return;
        }
        this.logger.addContext(JOB_LOGGER_PROPERTY, ibas.dates.toString(ibas.dates.now(), "yyyyMMddHHmmss"));
        super.do();
    }
    protected done(): void {
        super.done();
        this.lastRunTime = this.endTime.getTime();
    }
    /** 运行 */
    protected run(): boolean {
        if (ibas.objects.isNull(this.actions)) {
            // 尚未初始化
            let that: this = this;
            let boRepository: integration.bo.BORepositoryIntegration = new integration.bo.BORepositoryIntegration();
            boRepository.fetchAction({
                criteria: this.job,
                onCompleted(opRslt: ibas.IOperationResult<integration.bo.Action>): void {
                    try {
                        if (opRslt.resultCode !== 0) {
                            throw new Error(opRslt.message);
                        }
                        if (opRslt.resultObjects.length === 0) {
                            throw new Error(ibas.i18n.prop("integration_not_found_job_actions", that.job.name));
                        }
                        for (let item of opRslt.resultObjects) {
                            integration.bo.actionFactory.create({
                                action: item,
                                onError(error: Error): void {
                                    that.activated = false;
                                    that.log(ibas.emMessageLevel.ERROR, error.message);
                                },
                                onCompleted(action: ibas.Action): void {
                                    if (ibas.objects.isNull(that.actions)) {
                                        that.actions = new ibas.ArrayList<ibas.Action>();
                                    }
                                    // 设置日志记录
                                    action.setLogger(that.ibasLogger);
                                    that.actions.add(action);
                                    if (that.actions.length === opRslt.resultObjects.length) {
                                        // 全部加载完成
                                        that.runActions();
                                    }
                                }
                            });
                        }
                    } catch (error) {
                        // 出错，不在运行
                        that.activated = false;
                        that.log(ibas.emMessageLevel.ERROR, error.message);
                    }
                }
            });
        } else {
            // 已初始化，开始运行任务
            return this.runActions();
        }
        return false;
    }
    /** 运行子任务时调用 */
    onRun: Function;
    /** 运行子任务 */
    private runActions(): boolean {
        if (this.onRun instanceof Function) {
            this.onRun();
        }
        let action: ibas.Action = this.actions.firstOrDefault();
        if (ibas.objects.isNull(action)) {
            return true;
        }
        let that: this = this;
        let index: number = 0;
        let onDone: Function = function (): void {
            index++;
            if (index > 0 && index < that.actions.length) {
                action = that.actions[index];
                action.onDone = onDone;
                action.do();
            } else {
                that.done();
                index = null;
                onDone = null;
                action = null;
                that = null;
            }
        };
        action.onDone = onDone;
        action.do();
        return false;
    }
    /** 子任务 */
    private actions: ibas.IList<ibas.Action>;
}