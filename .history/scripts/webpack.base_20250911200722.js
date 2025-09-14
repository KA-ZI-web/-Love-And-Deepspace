// webpack.base.js
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname,'../src/index.tsx'),
    output:{
        path: path.resolve(__dirname,'../dist'),//打包后的代码放在dist目录下
        filename: 'bundle.js',//打包文件的名字
    },
    plugins:[
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname,'../public/index.html'),//自定义HTML模板
        title: '恋与深空'//页面标题
      }),
    ],
    resolve: {
      modules: ["node_modules"],
	    // 配置 extensions 来告诉 webpack 在没有书写后缀时，以什么样的顺序去寻找文件
      extensions: ['.mjs','.js', '.json', '.jsx', '.ts', '.tsx','.html'], // 如果项目中只有 tsx 或 ts 可以将其写在最前面
      alias:{
        '@':path.resolve(__dirname,'../src')
      },
    },
    module: {
    rules: [
      { test: /.(jsx?)|(tsx?)$/,//匹配所有.js文件
        exclude: /node_modules/,//排除 node_modules目录
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: 'iOS 9, Android 4.4, last 2 versions, > 0.2%, not dead', // 根据项目去配置
                  useBuiltIns: 'usage', // 会根据配置的目标环境找出需要的polyfill进行部分引入
                  corejs: 3, // 使用 core-js@3 版本
                },
              ],
              ['@babel/preset-typescript'],
              ['@babel/preset-react'],
            ],
          },
        },
      },
      { test: /\.(png|jpg|gif)$/i,//图像文件
        type: 'asset/resource',
        parser:{
          dataUrlCondition:{
            maxSize: 25*1024,//25kb
          },
        },
        generator:{
          filename:'assets/imgs/[name].[hash:8][ext]',
        },
      },
      { test: /\.(eot|ttf|woff|woff2)$/i,//字体文件
        type: 'asset/resource',
        parser:{
          dataUrlCondition:{
            maxSize: 25*1024,//25kb
          },
        },
        generator:{
          filename:'assets/fonts/[name].[hash:8][ext]',
        },
      }, 
      {test: /\.(mp4|avi)$/, // 匹配视频文件
      type: 'asset/resource', // 将文件原封不动输出
      generator: {
        filename: 'static/videos/[hash][ext][query]' // 输出路径和命名规则
      }
      },
    ],
  },
}