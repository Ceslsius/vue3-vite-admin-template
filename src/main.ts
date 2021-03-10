/*
 * @Descripttion:
 * @Author: Yi Yunwan
 * @Date: 2021-03-10 11:28:58
 * @LastEditors: Yi Yunwan
 * @LastEditTime: 2021-03-10 18:23:14
 */
import { createApp } from 'vue'
import App from './App.vue'
import { useElementPlus } from './element-plus'
import { router } from './router'

const app = createApp(App)
useElementPlus(app)
app.use(router)
app.mount('#app')
