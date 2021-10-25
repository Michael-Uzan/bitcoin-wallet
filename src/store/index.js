import Vue from 'vue'
import Vuex from 'vuex'
import userModule from '@/store/modules/user.module';

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    userModule
  }
})
