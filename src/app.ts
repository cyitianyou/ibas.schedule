/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as Koa from "koa";
import * as bodyParser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as cors from "koa2-cors";
import router from "./router";
import log4js from "./logger/index";
log4js.getLogger();
let app: Koa = new Koa();
app.use(cors()); // 作用：跨域
app.use(logger()); // 作用：日志
app.use(bodyParser()); // 作用：处理post消息实体
app.use(router.routes()); // 作用：启动路由
app.use(router.allowedMethods()); // 作用： 当请求出错时的处理逻辑
export default app;
