import Vue from 'vue'
import Router from 'vue-router'
import routes from './routers'
import store from '../store'
import { LoadingBar } from 'iview'
import { canTurnTo } from '../libs/util'

Vue.use(Router)
const router = new Router({
  routes
})

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  if (canTurnTo(to.name, store.state.user.access, routes)) {
    next()
  } else {
    next({replace: true, name: 'error_401'})
  }
})

router.afterEach(() => {
  LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router