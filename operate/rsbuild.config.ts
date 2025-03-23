import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginUmd } from '@rsbuild/plugin-umd'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig({
  html: {
    template: './public/index.html',
  },
  plugins: [
    pluginUmd({
      name: 'operate',
    }),
    pluginVue(),
    pluginLess({
      lessLoaderOptions: {
        // additionalData: [
        //   // 需要全局注入的less
        //   `@import "${path.resolve(__dirname, 'src/assets/styles/var.less')}";`
        // ].join(''),
        lessOptions: {
          javascriptEnabled: true,
          math: 'always',
        },
      },
    }),
  ],
  source: {
    // 指定入口文件
    entry: {
      index: './src/main.ts',
    },
    alias: {
      '@': resolve('src')
    },
  },
  output: {
    // transformImport: {

    // }
    // assetPrefix: '/operate',
    // distPath: {
    //   root: 'operate',
    //   js: 'static/js',
    // },
    // sourceMap: {
    //   js: process.env.NODE_ENV === 'development' ? 'eval' : false,
    // },
  },
  dev: {
    // assetPrefix: '/operate',
  },
  server: {
    port: 3002,
    cors: {
      origin: '*',
    },
    proxy: {
      '/operate': 'http://lpf.com:8040',
    },
  },
});
