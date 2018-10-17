/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import Service from "./Service";
import { IRouterContext } from "koa-router";
import { fs, path, calculate } from "../utils/index";
import { Stats } from "fs";
import { Schedule } from "../schedule/index";
export default class FileService extends Service implements IFileService {
    public async callMethod(ctx: IRouterContext): Promise<void> {
        let method: string = ctx.params.method;
        switch (method) {
            case this.resource.name:
                await this.resource(ctx);
                break;
            case this.download.name:
                await this.download(ctx);
                break;
            default:
                ctx.throw(404);
        }
    }
    public async resource(ctx: IRouterContext, noFresh?: boolean): Promise<void> {
        try {
            this.checkStatus();
            let logPath: string = this.getFilePath(ctx);
            let stats: Stats = await fs.stat(logPath);
            if (!!stats && stats.isFile()) {
                ctx.response.status = 200;
                ctx.response.lastModified = stats.mtime;
                ctx.response.length = stats.size;
                ctx.response.type = path.extname(logPath);
                if (!ctx.response.etag) {
                    ctx.response.etag = calculate(stats, {
                        weak: true
                    });
                }
                let fresh: boolean = ctx.request.fresh;
                if (noFresh || ctx.query.fresh === "false") {
                    // 若参数中指定,则不使用缓存
                    fresh = false;
                }
                switch (ctx.request.method) {
                    case "HEAD":
                        ctx.response.status = fresh ? 304 : 200;
                        break;
                    case "GET":
                        if (fresh) {
                            ctx.response.status = 304;
                        } else {
                            ctx.response.body = fs.createReadStream(logPath);
                        }
                        break;
                }
            }
        } catch (error) {
            ctx.response.body = error.message;
        }
    }
    public async download(ctx: IRouterContext): Promise<void> {
        try {
            this.checkStatus();
            await this.resource(ctx, true);
            ctx.attachment(ctx.request.query.name);
        } catch (error) {
            ctx.response.body = error.message;
        }
    }
    private getFilePath(ctx: IRouterContext): string {
        let key: number = ctx.request.query.key;
        let name: number = ctx.request.query.name;
        for (let taskAction of (<Schedule>global.window._schedule).jobs) {
            // tslint:disable-next-line:triple-equals
            if (taskAction.job.objectKey == key) {
                return taskAction.logDir + name;
            }
        }
        return "";
    }
}
export interface IFileService {
    resource(ctx: IRouterContext, noFresh?: boolean): Promise<void>;
    download(ctx: IRouterContext): Promise<void>;
}