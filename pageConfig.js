const path = require('path');

module.exports = {
  entries: [
    {
      title: "主页",
      name: "index",
      entry: './src/pages/home/index.js',
      template: path.resolve(__dirname, './src/pages/home/index.html'),
      filename: "./index.html",
    },
    {
      title: "Test",
      name: "test",
      entry: './src/pages/test/index.js',
      template: path.resolve(__dirname, './src/pages/test/index.html'),
      filename: "./test.html",
    },
  ],
};

