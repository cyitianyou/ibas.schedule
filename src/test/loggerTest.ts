import { Log4js, Logger } from "../../node_modules/log4js/types/log4js";
let log4js: Log4js = require("log4js");
log4js.configure({
    appenders: {
        console: {
            type: "console"
        },
        log_file: {
            type: "dateFile",
            filename: __dirname + "/logs/date.log",
            keepFileExt: true,
            alwaysIncludePattern: true,
            pattern: "-yyyy-MM-dd"
        },
        multi: {
            type: 'multiFile',
            base: 'logs/{[CC_IG_INTERGRATIONJOB].[ObjectKey = 1]}',
            property: 'job',
            extension: '.log'
        }
    },
    categories: {
        default: { appenders: ['console'], level: 'ALL' },
        log_file: { appenders: ['log_file'], level: 'ALL' },
        multi: { appenders: ['multi'], level: 'ALL' },
    }
});
let logger: Logger = log4js.getLogger("multi");
logger.addContext("job", "1234");
logger.debug("HelloWorld");
logger.error("HelloWorld");
logger.addContext("job", "2345");
logger.info("HelloWorld");
logger.warn("HelloWorld");