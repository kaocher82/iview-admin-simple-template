import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import user from './user'
import app from './app'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    app
  },
  plugins: [
    createPersistedState({
      key: 'STORE',
      paths: ['user']
    })]
})