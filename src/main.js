import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import iView from 'iview'
import './assets/less/iview-variables.less'

Vue.config.productionTip = false

Vue.prototype.setData = function (newData) {
  Object.keys(newData).map(key => this.$set(this.$data, key, newData[key]))
}

Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
