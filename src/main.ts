/*
 * @Descripttion:
 * @Author: Zhang Yunzhong
 * @Date: 2021-03-10 11:28:58
 * @LastEditors: Zhang Yunzhong
 * @LastEditTime: 2021-04-01 15:44:39
 */
import 'normalize.css'
import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import ElementPlus from 'element-plus'
import '@/styles/element-variables.scss'
import '@/styles/index.scss'
import 'dayjs/locale/zh-cn'
import locale from 'element-plus/lib/locale/lang/zh-cn'
const app = createApp(App)
app.use(router)
app.use(ElementPlus, { size: 'small', zIndex: 3000, locale })
app.mount('#app')
