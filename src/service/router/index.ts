/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as Router from "koa-router";
let router: Router = new Router();
router.get("/", (ctx, next) => {
    ctx.redirect("/services/rest/application.wadl");
});
router.post("/services/rest/data/:method", (ctx, next) => {
    ctx.body = ctx.params.method;
});
router.post("/services/rest/file/:method", (ctx, next) => {
    ctx.body = ctx.params.method;
});
router.get("/services/rest/application.wadl", (ctx, next) => {
    ctx.body = "服务已启动，API列表建设中。。。";
});
module.exports = router;