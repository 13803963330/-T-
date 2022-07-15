import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { getToken, setToken } from '@/utils/auth'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // user: storage.get('吴龙的') || {}
    user: getToken() || {}
  },
  getters: {},
  // 修改数据的位置
  mutations: {
    setUser (state, payle) {
      state.user = payle
      setToken(payle)
    }
  },
  actions: {},
  modules: {}
})
