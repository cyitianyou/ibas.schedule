
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