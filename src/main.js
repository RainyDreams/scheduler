import { createApp,provide } from 'vue'
// import { install } from '@icon-park/vue-next/es/all'
import vueHashCalendar from 'vue3-hash-calendar'
// import NProgress from 'nprogress'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import { taskPlugin } from './utils/global'
import 'element-plus/dist/index.css'
import 'animate.css/animate.min.css'
import './styles/main.scss'
import "babel-polyfill"
import './utils/touch'

const app = createApp(App);
// install(app)
app.use(router)
app.use(vueHashCalendar);
// app.use(NProgress)
app.use(ElementPlus)
app.use(taskPlugin);
// NProgress.configure({ showSpinner: false }) //我这里只关闭进度环
app.mount('#app')
