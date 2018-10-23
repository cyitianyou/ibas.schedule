/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../index.d.ts" />
/** 创建require方法 */
export function create(name: string, baseUrl: string): Function;
/** 创建require方法 */
export function create(name: string, baseUrl: string, noCache: boolean): Function;
/** 创建require方法 */
export function create(): Function {
    let name: string = arguments[0], baseUrl: string = arguments[1], noCache: boolean = arguments[2];
    if (!global.window
        || global.window.document.URL !== baseUrl) {
        polyfill(baseUrl);
    }
    if (noCache) {
        // 不使用缓存
        return window.require.config({
            context: name,
            baseUrl: baseUrl,
            waitSeconds: 30,
            urlArgs: function (id: string, url: string): string {
                return (url.indexOf("?") === -1 ? "?" : "&") + "_=" + (new Date()).getTime().toString();
            }
        });
    } else {
        return window.require.config({
            context: name,
            baseUrl: baseUrl,
            waitSeconds: 30,
        });
    }
}
// 胶水代码,补充node环境下window缺失的问题
export function polyfill(url: string): void {
    if (!url.endsWith("/")) { url = url + "/"; }
    const windowClass: any = require("window");
    // window
    global.window = new windowClass({ url: url });
    // document
    global.document = global.window.document;
    // require
    let requirejs: any = require("../3rdparty/r");
    // require不缓存requirejs
    delete require.cache[require.resolve("../3rdparty/r")];
    global.window.require = requirejs;
    // jQuery
    const $: any = require("jquery");
    global.$ = global.jQuery = $;

}