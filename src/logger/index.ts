/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import { Log4js, Logger, Configuration } from "../../node_modules/log4js/types/log4js";
let appConfig: Config = require("../config");
if (!appConfig.appSettings.logDir.endsWith("/")) {
    appConfig.appSettings.logDir += "/";
}
let log4js: Log4js = require("log4js");
let config: Configuration = {
    appenders: {
        console: {
            type: "console"
        },
        runtime: {
            type: "dateFile",
            filename: appConfig.appSettings.logDir + "runtime",
            keepFileExt: true,
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd.log"
        }
    },
    categories: {
        default: { appenders: ["console"], level: "ALL" },
        runtime: { appenders: ["runtime", "console"], level: "ALL" }
    }
};
log4js.configure(config);
let runtimeLogger: Logger = log4js.getLogger("runtime");
// tslint:disable:no-console
console.log = runtimeLogger.info.bind(runtimeLogger);
console.info = runtimeLogger.info.bind(runtimeLogger);
console.debug = runtimeLogger.debug.bind(runtimeLogger);
console.error = runtimeLogger.error.bind(runtimeLogger);
console.warn = runtimeLogger.warn.bind(runtimeLogger);
console.trace = runtimeLogger.trace.bind(runtimeLogger);
export const JOB_LOGGER_PROPERTY: string = "date";
export function getJobLogger(job: string): Logger {
    if (!config.appenders[job]) {
        config.appenders[job] = {
            type: "multiFile",
            base: appConfig.appSettings.logDir + job,
            property: JOB_LOGGER_PROPERTY,
            extension: ".log"
        };
        config.categories[job] = { appenders: [job], level: "ALL" };
    }
    log4js.configure(config);
    return log4js.getLogger(job);
}
export default log4js;