const path = require('path'),
    ExtractTextPlugin = require("extract-text-webpack-plugin"),
    UglifyJSPlugin = require('uglifyjs-webpack-plugin'),
    webpack = require('webpack'),
    OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');



module.exports = {

//入口
  entry: {
    bundle: './scripts/app.js',
  },
//导出
  output: {
    //导出目录   导出文件名
    path: path.resolve(__dirname, 'dist'),
    hashDigestLength: 3,  //hash位数
    filename: 'main.js',
  },
  devServer: {
       contentBase: '.'
  },
  //插件
  plugins: [
    //其他less等文件   转码  生成css文件
    new ExtractTextPlugin('main.css'),
    //压缩js
    new UglifyJSPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /main\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: {removeAll: true } },
      canPrint: true
    })
  ],


//模块
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader", "sass-loader"],
        }),
      },
      //js[x]文件  编译内容后 依旧是js文件 所以不需要 ExtractTextPlugin
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader',
        ],
      },
    ],
  },
}