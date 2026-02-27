const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    entry: './src/main.jsx',

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: isDev ? '[name].js' : '[name].[contenthash].js',
      clean: true,
      publicPath: '/',
    },

    resolve: {
      extensions: ['.js', '.jsx'],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env', { targets: 'defaults' }],
                ['@babel/preset-react', { runtime: 'automatic' }],
              ],
            },
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        // Static assets (fonts, images) served from /public — no loader needed
      ],
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
      }),
    ],

    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      // Serve /public folder as static root
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
      },
      open: true,
    },

    devtool: isDev ? 'eval-source-map' : 'source-map',

    performance: {
      hints: false,
    },
  };
};
