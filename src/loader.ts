/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */

require("./loader/polyfill");
// 最小库标记
export const SIGN_MIN_LIBRARY: string = ".min";
// ibas index路径
export const URL_IBAS_INDEX: string = "index";
export namespace requires {
    /** 运行时标记 */
    export const runtime: string = (new Date()).getTime().toString();
    /** 创建require方法 */
    export function create(name: string, baseUrl: string): Function;
    /** 创建require方法 */
    export function create(name: string, baseUrl: string, noCache: boolean): Function;
    /** 创建require方法 */
    export function create(): Function {
        let name: string = arguments[0], baseUrl: string = arguments[1], noCache: boolean = arguments[2];
        let requirejs: Require = require("requirejs");
        let http: Require = require("http");
        let httpRequire: any;
        if (noCache) {
            // 不使用缓存
            let runtime: string = requires.runtime;
            return httpRequire = (<any>requirejs.config)({
                context: name,
                baseUrl: baseUrl,
                nodeRequire: require,
                urlArgs: function (id: string, url: string): string {
                    return (url.indexOf("?") === -1 ? "?" : "&") + "_=" + runtime;
                }
            });
        } else {
            return httpRequire = (<any>requirejs.config)({
                context: name,
                baseUrl: baseUrl,
                nodeRequire: require
            });
        }
    }
}
/** 应用程序 */
export class Application {
    // index路径
    static URL_INDEX: string = "index";
    /** 根地址 */
    root: string;
    /** ibas 根地址 */
    ibasRoot: string;
    /** openui5 根地址 */
    openui5Root: string;
    /** 不使用缓存 */
    noCache: boolean;
    /** 使用最小库 */
    minLibrary: boolean;
    /** 名称 */
    name: string = "schedule";
    /** 运行应用 */
    run(url: string): void {
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
        requires.create("_", this.ibasRoot, this.noCache)([
            URL_IBAS_INDEX + (this.minLibrary ? SIGN_MIN_LIBRARY : "")
        ], function (): void {
            // 加载成功
            that.show();
        }, function (e: Error): void {
            that.diagnose();
        });
    }
    /** 显示视图 */
    private show(): void {
        //
    }
    /** 诊断错误 */
    private diagnose(): void {
        //
    }
}
