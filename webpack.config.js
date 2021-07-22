const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    index: './src/assets/scripts/pages/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
    clean: true,
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
  },
  module: {
    rules: [
      //解析.scss文件
      {
        test: /\.scss/,
        use: ['style-loader','css-loader','sass-loader']
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
    new HtmlWebpackPlugin({
      title: 'Development',
      template: './src/pages/home/index.html',
      filename: "index.html"
    }),
  ]
};
