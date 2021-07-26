const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pagesConfig = require('./pageConfig')

function getHtmlWebpackPlugin () {
  let result = []
  pagesConfig.pages.forEach(e => {
    result.push(new HtmlWebpackPlugin(e))
  })
  return result
}

module.exports = {
  mode: 'development',
  entry: {
    index: './src/pages/home/index.js'
  },
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
    ...getHtmlWebpackPlugin(),
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
    compress: true
  },
};
