/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
// 胶水代码,补充node环境下window缺失的问题
const windowClass: any = require("window");
// window
(<any>global).window = new windowClass();
// document
(<any>global).document = (<any>global).window.document;
// jQuery
const $: any = require("jQuery");
(<any>global).$ = (<any>global).jQuery = $;