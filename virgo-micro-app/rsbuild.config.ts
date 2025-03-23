import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginSass } from '@rsbuild/plugin-sass'

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

export default defineConfig({
  html: {
    template: './public/index.html',
  },
  plugins: [
    pluginReact(),
    pluginSass({
      sassLoaderOptions: {
        sassOptions: {
        },
      },
    }),
    pluginLess({
      lessLoaderOptions: {
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
      index: './src/index.tsx',
    },
    alias: {
      '@': resolve('src')
    },
  },
  server: {
    port: 3000,
    open: true
  },
});


