import App from './App'
// #ifndef VUE3
import Vue from 'vue'

//#ifndef MP
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import JsonExcel from 'vue-json-excel'
Vue.component('downloadExcel', JsonExcel)
Vue.use(ElementUI)
//#endif

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif