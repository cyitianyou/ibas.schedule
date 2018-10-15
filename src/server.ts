
/// <reference path="index.d.ts" />
import { IncomingMessage, ServerResponse, Server, createServer } from "http";
import { Http2ServerRequest, Http2ServerResponse } from "http2";
import app from "./app";
let config: Config = require("./config");
// app.callback() 会返回一个能够通过http.createServer创建server的函数，类似express和connect。
let currentApp: (req: IncomingMessage | Http2ServerRequest, res: ServerResponse | Http2ServerResponse) => void = app.callback();
// 创建server
const server: Server = createServer(currentApp);
server.listen(config.appSettings.port || 3000, () => {
    console.log("starting at port " + config.appSettings.port);
});
// 热加载
if (module.hot) {
    // 监听./app.ts
    module.hot.accept("./app.ts", () => {
        // 如果有改动，就使用新的app来处理请求
        server.removeListener("request", currentApp);
        currentApp = app.callback();
        server.on("request", currentApp);
    });
}