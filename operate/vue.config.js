module.exports = {
  devServer: {
    host: "localhost",
    port: 3002,
    open: false,
    hot: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    proxy: {
      '/operate': {
        target: 'http://lpf.com:8040',
        changeOrigin: true
      },
    }
  },
  configureWebpack: {
    output: {
      library: `operate`, // qiankun_config
      libraryTarget: "umd", // qiankun_config
      jsonpFunction: `webpackJsonp_operate`, // qiankun_config webpack4
      // chunkLoadingGlobal: `webpackJsonp_${packageName}`, // webpack5
    },
  }
};
