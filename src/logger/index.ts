/**
 * @license
 * Copyright Color-Coding Studio. All Rights Reserved.
 *
 * Use of this source code is governed by an Apache License, Version 2.0
 * that can be found in the LICENSE file at http://www.apache.org/licenses/LICENSE-2.0
 */
import { Log4js, Logger, Configuration } from "../../node_modules/log4js/types/log4js";
let log4js: Log4js = require("log4js");
let config: Configuration = {
    appenders: {
        console: {
            type: "console"
        },
        // log_file: {
        //     type: "dateFile",
        //     filename: "logs/date.log",
        //     keepFileExt: true,
        //     alwaysIncludePattern: true,
        //     pattern: "-yyyy-MM-dd"
        // },
        multi: {
            type: "multiFile",
            base: "logs/",
            property: "job",
            extension: ".log"
        }
    },
    categories: {
        default: { appenders: ["console"], level: "ALL" },
        multi: { appenders: ["multi"], level: "ALL" },
    }
};
export const JOB_LOGGER_PROPERTY = "date";
export function getJobLogger(job: string): Logger {
    if (!config.appenders[job]) {
        config.appenders[job] = {
            type: "multiFile",
            base: "logs/" + job,
            property: JOB_LOGGER_PROPERTY,
            extension: ".log"
        };
        config.categories[job] = { appenders: [job, "console"], level: "ALL" };
    }
    log4js.configure(config);
    return log4js.getLogger(job);
}