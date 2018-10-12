/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="../3rdparty/ibas.d.ts" />
import Loader from "../loader/index";
import { Schedule } from "../schedule/Sehedule";
let loader: Loader = new Loader();
loader.noCache = false;
loader.minLibrary = false;
loader.user = "admin";
loader.password = "1q2w3e";
loader.run("http://localhost:15386/", function (): void {
    let schedule: Schedule = new Schedule();
    schedule.start();
});