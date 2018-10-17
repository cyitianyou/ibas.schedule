/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import {
    OperationResult, OperationInformation, OperationMessage
} from "./OperationResult";
import {
    IOperationResult, IOperationInformation, IOperationMessage, ITaskAction
} from "./DataDeclaration";
import { TaskAction } from "../schedule/index";
import { fs } from "../utils/index";
/** 数据转换，ibas4Node.js */
export class DataConverter4js implements IDataConverter {
    /**
     * 转换业务对象数据
     * @param data 本地类型
     * @param sign 特殊标记
     * @returns 目标类型
     */
    async convert(data: any, sign: string): Promise<any> {
        if (data instanceof OperationResult) {
            let newData: OperationResult<any> = data;
            let resultObjects: any[] = [];
            for (let item of newData.resultObjects) {
                resultObjects.push(await this.convert(item, null));
            }
            let informations: IOperationInformation[] = [];
            for (let item of newData.informations) {
                informations.push(await this.convert(item, null));
            }
            let remote: IOperationResult = {
                type: data.constructor.name,
                SignID: newData.signID,
                Time: newData.time.toISOString(),
                UserSign: newData.userSign,
                ResultCode: newData.resultCode,
                Message: newData.message,
                ResultObjects: resultObjects,
                Informations: informations
            };
            return remote;
        } else if (data instanceof OperationInformation) {
            let newData: OperationInformation = data;
            let remote: IOperationInformation = {
                type: data.constructor.name,
                Name: newData.name,
                Tag: newData.tag,
                Content: newData.content,
            };
            return remote;
        } else if (data instanceof OperationMessage) {
            let newData: OperationMessage = data;
            let remote: IOperationMessage = {
                type: data.constructor.name,
                SignID: newData.signID,
                UserSign: newData.userSign,
                Time: newData.time.toISOString(),
                ResultCode: newData.resultCode,
                Message: newData.message,
            };
            return remote;
        } else if (data instanceof TaskAction) {
            let newData: TaskAction = data;
            let remote: ITaskAction = {
                /** 编号 */
                ObjectKey: newData.job.objectKey,
                /** 工作 */
                JobName: newData.job.name,
                /** 上次运行时间 */
                LastRunTime: newData.lastRunTime,
                /** 激活的 */
                Activated: newData.activated,
                /** 执行中 */
                IsRunning: newData.isRunning(),
                /** 已运行次数 */
                RanTimes: 0,
            };
            remote.RanTimes = (await fs.readdir(newData.logDir)).length;
            return remote;
        } else {
            return data;
        }
    }
    /**
     * 解析业务对象数据
     * @param data 目标类型
     * @param sign 特殊标记
     * @returns 本地类型
     */
    parsing(data: any, sign: string): any {
        return data;
    }
}

/**
 * 数据转换者
 */
export interface IDataConverter {
    /**
     * 转换业务对象数据
     * @param data 本地类型
     * @param sign 特殊标记
     * @returns 目标类型
     */
    convert(data: any, sign: string): Promise<any>;
    /**
     * 解析业务对象数据
     * @param data 目标类型
     * @param sign 特殊标记
     * @returns 本地类型
     */
    parsing(data: any, sign: string): Promise<any>;
}