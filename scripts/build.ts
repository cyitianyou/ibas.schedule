import * as webpack from "webpack";

import WebpackConfig from "./webpack.config";

const buildConfig: WebpackConfig = new WebpackConfig("production");

webpack(buildConfig).run((err: Error) => {
    console.log(err);
});