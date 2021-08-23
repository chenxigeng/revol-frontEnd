const path = require('path');

module.exports = {
  entries: [
    {
      title: "主页",
      name: "home",
      entry: './src/pages/home/index.js',
      template: path.resolve(__dirname, './src/pages/home/index.html'),
      filename: "./index.html",
    },
    {
      title: "Demo",
      name: "demo",
      entry: './src/pages/demo/demo.js',
      template: path.resolve(__dirname, './src/pages/demo/demo.html'),
      filename: "./demo.html",
    },
  ],
};

