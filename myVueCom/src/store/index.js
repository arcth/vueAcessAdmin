/**
 *
 */

// import Vue from 'vue'
// import Vuex from 'vuex'
//
// //引入模块
// import actions from './actions'
// import getters from './getters'
// import mutations from './mutations'
// import state from './states'
//
// Vue.use(Vuex)
//
// export default new Vuex.Store({
//   state,
//   getters,
//   actions,
//   mutations
// })

import Vue from 'vue'
import Vuex from 'vuex'

import app from './app/app'
import user from './user/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {},
    modules: {
        app,
        user
    }
})

export default store;
