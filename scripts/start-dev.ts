import * as webpack from "webpack";

import WebpackConfig from "./webpack.config";

const devConfig: WebpackConfig = new WebpackConfig("development");

webpack(devConfig).watch({
    aggregateTimeout: 300
}, (err: Error) => {
    console.log(err);
});