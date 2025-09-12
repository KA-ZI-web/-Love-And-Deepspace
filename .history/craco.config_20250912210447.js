// craco.config.js
const path = require('path');

module.exports = {
  webpack: {
    resolve:{
      alias : {
        'swiper/css': path.resolve(__dirname, 'node_modules/swiper/swiper.min.css'),
        'swiper/css/navigation': path.resolve(__dirname, 'node_modules/swiper/modules/navigation.min.css'),
        'swiper/css/pagination': path.resolve(__dirname, 'node_modules/swiper/modules/pagination.min.css')
      },
      extensions: ['.tsx', '.ts', '.jsx', '.js', '.json']
    },

    configure: {
      output: {
        publicPath: '/-Love-And-Deepspace/',
      },
    },
    
    configure: (webpackConfig) => {
      // 修复 CSS 加载器配置
      webpackConfig.module.rules.forEach(rule => {
        if (rule.oneOf) {
          rule.oneOf = rule.oneOf.map(loader => {
            if (loader.test && loader.test.toString().includes('css')) {
              return {
                test: /\.css$/,
                use: [
                  'style-loader',
                  {
                    loader: 'css-loader',
                    options: {
                      importLoaders: 1,
                      modules: false
                    }
                  },
                  'postcss-loader'
                ],
                exclude: /node_modules/,
                sideEffects: true
              };
            }
            return loader;
          });
        }
        return rule;
      });
      return webpackConfig;
    },
    
  },
  devServer: {
    port: 3000,
    open: true
  }
}