import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import Toast, { POSITION } from 'vue-toastification'
import "vue-toastification/dist/index.css"

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Antd)
app.use(Toast, {
    position: POSITION.TOP_CENTER
})

app.mount('#app')
