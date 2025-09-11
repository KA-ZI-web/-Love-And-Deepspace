// webpack.prod.js
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(base,{
  module: {
    rules: [
      {
        test: /.s?css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader' },
          { loader: 'postcss-loader' },
        ],
        exclude:/node_moudles/,
      },
    ],
  },
  optimization: {
    minimizer: [
      // 在 webpack@5 中，你可以使用 `...` 语法来扩展现有的 minimizer（即 `terser-webpack-plugin`），将下一行取消注释
      // `...`,
      new CssMinimizerPlugin({
        // 默认开启
        // parallel true:  // 多进程并发执行，提升构建速度 。 运行时默认的并发数：os.cpus().length - 1
      }),
    ],
  },
  plugins: [new MiniCssExtractPlugin({
    filename:'../dist/assets/css/[hash:8].css',// 将css单独提测出来放在assets/css 下
  })],
})