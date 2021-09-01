const path = require('path');

const getOutputPath = (app) => `../../static/${app}/js/index.js`

module.exports = (_, options) => {
  return {
    entry: {
      common: {
          import: './src/common/js/index.js',
          filename: getOutputPath('common')
      },
      homepage: {
          import: './src/homepage/js/index.js',
          filename: getOutputPath('homepage')
      },
      app_calculator: {
          import: './src/app_calculator/js/index.js',
          filename: getOutputPath('app_calculator')
      }
    },
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            "style-loader",
            "css-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.svg$/,
          use: [
            "svg-inline-loader"
          ]
        }
      ],
    },
    watch: options.mode === 'development'
  };
}