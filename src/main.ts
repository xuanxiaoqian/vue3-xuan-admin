import i18n from '@/i18n'
import router from '@/router/index'
import pinia from '@/store/index'
import '@/style/tailwind.css'
import ElementPlus from 'element-plus'

import { createApp } from 'vue'
import App from './App.vue'

import '@/style/reset.css'
import 'element-plus/dist/index.css'
import { Icon } from './layout/components/Sidebar/createIcon'


const app = createApp(App)

app.use(pinia)
app.use(i18n)
app.use(router)
app.use(ElementPlus)


app.component('Icon', Icon)

app.mount('#app')
