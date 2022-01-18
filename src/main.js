import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Maska from 'maska'
import mitt from 'mitt'
import '@/assets/styles/main.scss'

const app = createApp(App)
const emitter = mitt()

app.config.globalProperties.emitter = emitter

app.use(VueAxios, axios)
app.use(store)
app.use(router)
app.use(Maska)
app.mount('#app')
// createApp(App).use(VueAxios, axios).use(store).use(router).use(Maska).mount('#app')
