const path = require('path');

const getOutputPath = (app) => `../../static/${app}/js/index.js`

const applications = {
  common: {
    id: 'common'
  },
  homepage: {
    id: 'homepage'
  },
  app_calculator: {
    id: 'app_calculator'
  },
  app_text_generator: {
    id: 'app_text_generator'
  },
  app_csv_editor: {
    id: 'app_csv_editor'
  },
  app_task_manager: {
    id: 'app_task_manager'
  }
}

module.exports = (_, options) => {
  return {
    // entry: {
    //   common: {
    //       import: './src/common/js/index.js',
    //       filename: getOutputPath('common')
    //   },
    // },
    entry: Object.values(applications).reduce((acc, curr) => {
      return {
        ...acc,
        [curr.id]: {
          import: `./src/${curr.id}/js/index.js`,
          filename: getOutputPath(curr.id)
        }
      }
    }, {}),
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
            test: /\.css/i,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
          test: /\.svg$/,
          use: [
            "svg-inline-loader"
          ]
        },
        
        {
          test: /\.(jsx|js)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react'],
                plugins: ["@babel/plugin-transform-runtime"]
              },
            }
          ]
        },
      ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            common: path.resolve(__dirname, 'src/common/js')
        }
    },
    watch: options.mode === 'development'
  };
}