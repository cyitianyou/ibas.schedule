/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas.d.ts" />
import Loader from "../loader/index";
import log4js from "../logger/index";
import { Schedule } from "../schedule/Schedule";
let loader: Loader = new Loader();
loader.noCache = false;
loader.minLibrary = false;
loader.user = "admin";
loader.password = "1q2w3e";
// loader.run("http://localhost:15386/", function (): void {
//     let schedule: Schedule = new Schedule();
//     schedule.start();
// });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
let stratTime: Date = new Date();
loader.run("https://www.colorcoding.org/demo/").then(() => {
    let endTime: Date = new Date();
    console.log(ibas.strings.format("加载vstore花费时间{0}秒", ibas.dates.difference(ibas.dates.emDifferenceType.SECOND, endTime, stratTime)));
    let schedule: Schedule = new Schedule();
    schedule.start();
});