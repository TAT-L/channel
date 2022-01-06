import App from './App'
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import JsonExcel from 'vue-json-excel'
Vue.config.productionTip = false
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI)
App.mpType = 'app'
const app = new Vue({
    ...App
})
app.$mount()
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
