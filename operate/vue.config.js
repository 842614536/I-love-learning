module.exports = {
  devServer: {
    host: "localhost",
    port: 3002,
    open: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  configureWebpack: {
    output: {
      library: `operate`, // qiankun_config
      libraryTarget: "umd", // qiankun_config
      jsonpFunction: `webpackJsonp_operate`, // qiankun_config webpack4
      // chunkLoadingGlobal: `webpackJsonp_${packageName}`, // webpack5
    },
  },
};
