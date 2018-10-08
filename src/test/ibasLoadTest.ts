/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
// var Loader: any = require("../loader/index");
// var loader: any = new Loader();
// loader.noCache = false;
// loader.minLibrary = false;
// loader.run("https://app.avacloud.com.cn/t4v6wfh1/p02/");
// loader.run("http://localhost:15386/");
var Schedule: any = require("../schedule/Sehedule");
var schedule: any = new Schedule();
schedule.initialize("http://localhost:15386/", "admin", "1q2w3e");