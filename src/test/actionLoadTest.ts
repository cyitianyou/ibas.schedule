/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
// let requires: any = require("../loader/index").requires;
// requires.polyfill("http://localhost:15386/");
var Loader: any = require("../loader/index");
var loader: any = new Loader();
loader.noCache = false;
loader.minLibrary = false;
loader.run("http://localhost:15386/", function (): void {
    (<any>window).require.config({
        context: "_",
        baseUrl: "http://localhost:8080/integration/services/rest/action/2938db3f73982bd6f413dfcb5d2917b0/",
        urlArgs: function (id: string, url: string): string {
            return (url.indexOf("?") === -1 ? "?" : "&") + "token=5bca401809bef80d8ce6f5a68926b3b2";
        }
    })([
        "ScanResultFormatAction"
    ], function (action: any): void {
        // 加载成功
        console.log(action);
    }, function (e: Error): void {
        console.log(e);
    });
});