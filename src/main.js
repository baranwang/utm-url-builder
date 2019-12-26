import Vue from 'vue'
import Antd from 'ant-design-vue'
import App from './App.vue'

Vue.config.productionTip = false
Vue.use(Antd)

new Vue({
  render: h => h(App),
}).$mount('#app')
