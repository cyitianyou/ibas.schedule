/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as requires from "./requires";
// 最小库标记
export const SIGN_MIN_LIBRARY: string = ".min";
// ibas index路径
export const URL_IBAS_INDEX: string = "ibas/index";
/** 应用程序 */
class Application {
    // index路径
    static URL_INDEX: string = "index";
    /** 根地址 */
    root: string;
    /** ibas 根地址 */
    ibasRoot: string;
    /** 不使用缓存 */
    noCache: boolean;
    /** 使用最小库 */
    minLibrary: boolean;
    /** 名称 */
    name: string = "shell";
    /** 运行应用 */
    run(url: string, callback: Function): void {
        if (typeof arguments[0] === "string") {
            this.root = arguments[0];
        }
        if (!this.root.endsWith("/")) {
            this.root += "/";
        }
        if (this.ibasRoot === null || this.ibasRoot === undefined) {
            this.ibasRoot = this.root;
        }
        let that: this = this;
        requires.polyfill(this.root);
        requires.create("_", this.ibasRoot, this.noCache)([
            URL_IBAS_INDEX + (this.minLibrary ? SIGN_MIN_LIBRARY : ""),
        ], function (): void {
            let ibas: any = (<any>global).ibas;
            // 模块require函数
            let require: any = ibas.requires.create({
                context: ibas.requires.naming(that.name),
                baseUrl: that.root + that.name,
                waitSeconds: ibas.config.get(ibas.requires.CONFIG_ITEM_WAIT_SECONDS, 30)
            });
            require([
                Application.URL_INDEX + (that.minLibrary ? SIGN_MIN_LIBRARY : "")
            ], function (): void {
                // 加载成功
                callback();
            }, function (e: Error): void {
                callback(e);
            });
        }, function (e: Error): void {
            callback(e);
        });
    }
}
export default Application;
