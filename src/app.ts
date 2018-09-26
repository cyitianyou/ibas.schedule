/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
/// <reference path="./loader/index.ts" />
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
let app: Koa = new Koa();
app.use(logger());
app.use(bodyParser());
let loader: any = require("./loader");
let application: any = new loader.Application();
application.noCache = false;
application.minLibrary = false;
application.run("http://localhost:15386/ibas");
app.listen(3000);
module.exports = app;
