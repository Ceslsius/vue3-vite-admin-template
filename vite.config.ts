/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-10 11:28:58
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-24 10:32:55
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import "@/styles/_variables.scss";@import "@/styles/_mixins.scss";',
      },
    },
  },
  server: {
    proxy: {
      '/public/js': 'http://webtest.taktak.tv',
      // '/public/js': 'http://webdev.taktak.tv',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})