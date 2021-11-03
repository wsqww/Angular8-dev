module.exports = [
  {
    context: [
      '/flomoapp',
    ],
    target: 'https://flomoapp.com',
    pathRewrite: {
      '^/flomoapp': '',
    },
    secure: false,
    logLevel: "debug",
    changeOrigin: true
  }
];
