const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pagesConfig = require('./pageConfig')

let HTMLPlugins = [];
// 入口文件集合
let Entries = {};
pagesConfig.entries.forEach(page => {
  let htmlPlugin = new HtmlWebpackPlugin({
    //根据模板插入css/js等生成最终HTML
    filename: page.filename, //生成的html存放路径，相对于path
    template: page.template, //html模板路径
    title: page.title,
    minify: false,
    inject: "body", //js插入的位置，true/'head'/'body'/false
    hash: true, //为静态资源生成hash值
    chunks: [page.name], //需要引入的chunk，不配置就会引入所有页面的资源
  });

  HTMLPlugins.push(htmlPlugin);
  Entries[page.name] = page.entry;
})

module.exports = {
  mode: 'development',
  entry: Entries,
  output: {
    filename: 'scripts/[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash:10][ext][query]', // 设置图片资源的输出位置
    clean: true
  },
  module: {
    rules: [
      //解析.scss文件
      {
        test: /\.s[ac]ss/,
        use: [
          // 在开发过程中回退到 style-loader
          process.env.NODE_ENV !== 'production'
            ? 'style-loader'
            : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      //解析.css文件
      {
        test: /\.css/,
        use: ['style-loader','css-loader']
      },
      //将 HTML 导出为字符串
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: 'asset/resource'
      },
      {
        test: require.resolve("jquery"),
        loader: "expose-loader",
        options: {
          exposes: ["$", "jQuery"], // 将$和jQuery暴露给全局
        },
      },
    ]
  },
  plugins: [
    ...HTMLPlugins,
    new MiniCssExtractPlugin({
      // 与 webpackOptions.output 中的选项相似
      // 所有的选项都是可选的
      filename: 'css/[name].css',
      chunkFilename: 'css/[id].css',
    }),
  ],

  devtool: 'inline-source-map',

  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },

  // 开发服务器 devServer: 用来自动化（自动编译、自动打开浏览器，自动刷新浏览器）
  // 只会在内存中编译打包、不会有任何打包
  devServer: {
    contentBase: path.resolve(__dirname, 'dist/pages'),
    compress: true,
    port: 8090
  },
};
