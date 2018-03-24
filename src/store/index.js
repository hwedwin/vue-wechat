
import Vue from 'vue'
import Vuex from 'vuex'

import * as actions from './actions'
import * as mutations from './mutations'
import state from './state'
import * as getters from './getters'

Vue.use(Vuex)
var store = new Vuex.Store({
	state,
	actions,
	mutations,
	getters
})

export default store