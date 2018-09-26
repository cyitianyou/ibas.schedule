/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/** 运行时标记 */
export const runtime: string = (new Date()).getTime().toString();
/** 创建require方法 */
export function create(name: string, baseUrl: string): Function;
/** 创建require方法 */
export function create(name: string, baseUrl: string, noCache: boolean): Function;
/** 创建require方法 */
export function create(): Function {
    let name: string = arguments[0], baseUrl: string = arguments[1], noCache: boolean = arguments[2];
    let requirejs: Require = require("../3rdparty/r");
    let httpRequire: any;
    if (noCache) {
        // 不使用缓存
        httpRequire = (<any>requirejs.config)({
            context: name,
            baseUrl: baseUrl,
            nodeRequire: require,
            urlArgs: function (id: string, url: string): string {
                return (url.indexOf("?") === -1 ? "?" : "&") + "_=" + runtime;
            }
        });
    } else {
        httpRequire = (<any>requirejs.config)({
            context: name,
            baseUrl: baseUrl,
            nodeRequire: require
        });
    }
    return function (deps: Array<string>, callback?: Function, errback?: Function, optional?: any): any {
        if (!(deps instanceof Array)) {
            deps = [deps];
        }
        let newDeps: Array<string> = new Array();
        for (let dep of deps) {
            let url: string = httpRequire.toUrl(dep);
        }
    };
}