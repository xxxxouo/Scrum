const path = require('path'); // 这个是node.js的path模块，用来处理文件和目录的路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这个插件可以自动在dist目录下生成index.html文件
const  MiniCssExtractPlugin = require('mini-css-extract-plugin') // 这个插件可以把css文件提取出来 成为单独的文件
module.exports = {
  entry:'./src/index',
  output: {
    path: path.resolve(__dirname, 'dist'),
  },
  cache: {
    type: 'filesystem', // 默认是memory 这个是指定缓存在文件系统中 
    allowCollectingMemory: true, // 是否允许收集内存
  },
  resolve:{
    extensions: ['.js', '.json', '.wasm', '.mjs', '.jsx'], // import时省略文件后缀名
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // 这个可以直接写src目录下的文件名，不用写相对路径
  },
  mode: 'development',
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin()
  ],
  devtool:'eval-cheap-module-source-map', // 开启souce-map 用于开发调试
  devServer:{
    static:{
      directory: path.join(__dirname, 'public'), // 这个是指定静态文件的目录
    },
    compress:true, // 开启压缩
    hot:true,
    port:9999,
    historyApiFallback:true,  // 这个是用于解决react-router 页面404 问题
    proxy:{
      '/api':{
        target:'http://localhost:7001',
      }
    },
    client:{ 
      // 这个是用于显示错误和警告
      overlay:{
        errors: true,
        warnings: false,
      }, 
      // progress: true, // 这个是控制台显示打包进度
    }
  },
  module:{
    rules:[
      {
        test:[/\.js$/i, /\.jsx$/i], 
        exclude: /node_modules/, // 这个是排除node_modules目录
        use:{
          loader:'babel-loader',
        }
      },
      {
        test:/\.css$/i,
        use:[
          "style-loader",
          "css-loader",
          "postcss-loader",
        ]
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        type: 'asset'
      }
    ]
  }
}