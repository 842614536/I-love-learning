import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginSass } from '@rsbuild/plugin-sass'
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
      name: 'client',
    }),
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
    port: 3001,
    open: false,
    cors: {
      origin: '*',
    },
  },
});


