import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		forcedLogin: false,
		hasLogin: false,
		userId: '',
		uuid: ''
	},
	mutations: {
		login(state, userId, uuid) {
			state.forcedLogin = true;
			state.hasLogin = true;
			state.uuid = uuid;
			state.userId = userId;
		}
	}
})

export default store
