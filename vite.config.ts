/*
 * @Descripttion: 
 * @Author: Zhang Yunzhong
 * @Date: 2021-05-12 10:24:40
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-05-12 10:29:44
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
      '/public/js': 'http://123.com',
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
