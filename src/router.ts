/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import * as Router from "koa-router";
import { dataService, fileService } from "./service/index";
let router: Router = new Router();
router.get("/", (ctx, next) => {
    ctx.redirect("/services/rest/application.wadl");
});
router.post("/services/rest/data/:method", (ctx, next) => {
    dataService.callMethod(ctx);
});
router.post("/services/rest/file/:method", (ctx, next) => {
    fileService.callMethod(ctx);
});
router.get("/services/rest/application.wadl", (ctx, next) => {
    ctx.body = "服务已启动，API列表建设中。。。";
});
export default router;