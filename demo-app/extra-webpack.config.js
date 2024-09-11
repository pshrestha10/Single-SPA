const singleSpaAngularWebpack =
  require("single-spa-angular/lib/webpack").default;
const { merge } = require("webpack-merge");
const CopyPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = (config, options) => {
  config = merge(config, {
    plugins: [
      // config.mode === 'production' ? new Dotenv() : new Dotenv({ silent: true }),
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(
              __dirname,
              "node_modules",
              "en-web-components",
              "dist",
              "en",
              "en.css"
            ),
            to: path.resolve(
              __dirname,
              "dist",
              "demo-app",
              "en-web-components",
              "en.css"
            ),
          },
        ],
      }),
    ],
  });
  const singleSpaWebpackConfig = singleSpaAngularWebpack(config, options);

  // Feel free to modify this webpack config however you'd like to
  return singleSpaWebpackConfig;
};
