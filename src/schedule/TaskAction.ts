/// <reference path="../3rdparty/integration.d.ts" />
/// <reference path="../3rdparty/ibas.d.ts" />
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
    logger: ibas.ILogger;
    /** 设置日志记录者 */
    setLogger(logger: ibas.ILogger): void {
        this.logger = logger;
        super.setLogger(this.logger);
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
                                    action.setLogger(that.logger);
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