import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
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
      name: 'caocao',
    }),
    pluginReact(),
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
  tools: {
    rspack: (config, { appendPlugins, rspack }) => {
      config.resolve = {
        ...config.resolve, // 保留默认配置
        extensions: [".vue", ".js", ".jsx", ".tsx", ".ts", ".json", ".css", ".less"],
      }
      return config
    },
  },
  dev: {
    // lazyCompilation: true,
    progressBar: true,
  },
  server: {
    port: 3885,
    open: false,
    cors: {
      origin: '*',
    },
  },
});
