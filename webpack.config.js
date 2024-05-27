const path = require('path'); // 这个是node.js的path模块，用来处理文件和目录的路径
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 这个插件可以自动在dist目录下生成index.html文件
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;  // 分析打包体积
const  MiniCssExtractPlugin = require('mini-css-extract-plugin') // 这个插件可以把css文件提取出来 成为单独的文件
module.exports = {
  entry:'./src/index',
  output: {
    clean:true,
    filename: "[name].[contenthash].js",
    chunkFilename:"[name].[contenthash].js",
    path: path.resolve(__dirname, 'dist'),
  },
  resolve:{
    extensions: ['.js', '.json', '.wasm', '.mjs', '.jsx','cjs'], //省略后缀名
    modules: [path.resolve(__dirname, 'src'), 'node_modules'], // 这个可以直接写src目录下的文件名，不用写相对路径
  },
  mode: 'production',
  optimization:{
    runtimeChunk: true, 
    // 打包优化 代码分割 按需加载  把常用的库单独打包 
    splitChunks:{
      cacheGroups:{
        vendor: {
          priority: 1, // 优先级

          test: /node_modules/,
          name: 'vendors',
          chunks: 'all',
          minSize: 0,
          minChunks: 1
        }
      }
    }
  },
  plugins:[ 
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin(),
    new BundleAnalyzerPlugin()
  ],
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
          MiniCssExtractPlugin.loader,
          // "style-loader",
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