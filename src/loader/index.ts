﻿/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../index.d.ts" />
import * as requires from "./requires";
import ModuleConsolesLoader from "./ModuleConsolesLoader";
// 最小库标记
export const SIGN_MIN_LIBRARY: string = ".min";
// ibas index路径
export const URL_IBAS_INDEX: string = "ibas/index";
/** 应用程序 */
class Application {
    // index路径
    static URL_INDEX: string = "index";
    /** 根地址 */
    public root: string;
    /** 用户 */
    public user: string;
    /** 密码 */
    public password: string;
    /** 用户口令 */
    public token: string;
    /** 不使用缓存 */
    public noCache: boolean;
    /** 使用最小库 */
    public minLibrary: boolean;
    /** 名称 */
    name: string = "shell";
    /** 运行应用 */
    async run(url: string): Promise<void> {
        let that: this = this;
        if (typeof arguments[0] === "string") {
            this.root = arguments[0];
        }
        if (!this.root.endsWith("/")) {
            this.root += "/";
        }
        let promise: Promise<void> = new Promise<void>(resolve => {
            let ibasIndexUrl: string = URL_IBAS_INDEX + (this.minLibrary ? SIGN_MIN_LIBRARY : "");
            requires.create("_", this.root, this.noCache)([
                ibasIndexUrl,
            ], function (): void {
                let ibas: any = (<any>global).ibas;
                if (!ibas) {
                    // 加载出错
                    window.require.undef(ibasIndexUrl);
                    global.window = undefined;
                    global.document = undefined;
                    resolve();
                    return;
                }
                // #region 临时代码补丁,记得删除
                ibas.urls.rootUrl = function (): string {
                    if (ibas.strings.isEmpty(arguments[0])) {
                        // 未提供类型，则返回文档地址
                        let url: string = document.location.origin + document.location.pathname;
                        return url.substring(0, url.lastIndexOf("/"));
                    }
                    let fileName: string = arguments[0];
                    if (!fileName.startsWith("/")) { fileName = "/" + fileName; }
                    if (!fileName.endsWith(".js")) { fileName = fileName + ".js"; }
                    let fileName2: string = fileName.indexOf(ibas.SIGN_MIN_LIBRARY + ".js") > 0 ?
                        fileName : fileName.replace(".js", ibas.SIGN_MIN_LIBRARY + ".js");
                    let root: string = window.document.location.origin;
                    let scripts: HTMLCollectionOf<HTMLScriptElement> = document.getElementsByTagName("script");
                    let url: string = ibas.urls.normalize(ibas.urls.rootUrl() + fileName);
                    root = url.substring(0, url.lastIndexOf("/"));
                    return root;
                };
                // #endregion
                // 模块require函数
                let require: any = ibas.requires.create({
                    context: ibas.requires.naming(that.name),
                    baseUrl: that.root + that.name,
                    waitSeconds: ibas.config.get(ibas.requires.CONFIG_ITEM_WAIT_SECONDS, 30)
                });
                require([
                    Application.URL_INDEX + (that.minLibrary ? SIGN_MIN_LIBRARY : "")
                ], async function (): Promise<void> {
                    // 加载成功
                    if ((!!that.token) || (!!that.user && !!that.password)) {
                        // 已设置用户名密码,自动加载模块
                        await that.login();
                        resolve();
                    } else {
                        resolve();
                    }
                }, function (e: Error): void {
                    resolve();
                });
            }, function (e: Error): void {
                resolve();
            });
        });
        return promise;
    }
    async login(): Promise<void> {
        let config: Config = require("../config");
        let moduleConsolesLoader: ModuleConsolesLoader = new ModuleConsolesLoader();
        if (!!this.token) {
            return moduleConsolesLoader.login({
                token: this.token
            });
        } else {
            return moduleConsolesLoader.login({
                user: this.user && config.appSettings.defaultUser,
                password: this.password && config.appSettings.defaultPassword
            });
        }
    }
}
export default Application;
