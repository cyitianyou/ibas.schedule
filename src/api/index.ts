/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
export enum emScheduleStatus {
    /** 服务不可达 */
    UNREACHABLE,
    /** 未初始化 */
    UNINITIALIZED,
    /** 正在初始化 */
    INITIALIZING,
    /** 已暂停 */
    SUSPENDED,
    /** 运行中 */
    RUNNING
}