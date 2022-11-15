import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		"userinfo": {}
	},
	mutations: {
		setUser(state, userinfo) {
			state.userinfo = userinfo
		},
		clearUser(state, payload) {
			state.userinfo = payload
		}
	},
	actions: {
		setUser(context, user) {
			context.commit('setUser', user)
		},
		clearUser(context) {
			context.commit('clearUser', {})
		}
	}
})
export default store