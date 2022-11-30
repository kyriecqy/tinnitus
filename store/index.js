import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);//vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state:{//存放状态
		"userinfo": {}, //用户信息
		"musicinfo": {
			list: [
				{
					name: ''
				}
			],
			isPlay: false,
			currentIndex: 0,
			stopTime: 0,
			music: uni.createInnerAudioContext()
		}
	},
	mutations: {
		//用户信息相关
		setUser(state, userinfo) {
			state.userinfo = userinfo
		},
		clearUser(state, payload) {
			state.userinfo = payload
		},
		
		//音乐播放相关
		setList(state, list) {
			state.musicinfo.list = list
		},
		setCurrent(state, currentIndex) {
			state.musicinfo.currentIndex = currentIndex
		},
		 setStatus(state, isPlay) {
			 state.musicinfo.isPlay = isPlay
		 }
	},
	actions: {
		//用户信息相关
		setUser(context, user) {
			context.commit('setUser', user)
		},
		clearUser(context) {
			context.commit('clearUser', {})
		},
		
		//音乐播放相关
		setList(context, list) {
			context.commit('setList', list)
		},
		setCurrent(context, currentIndex) {
			context.commit('setCurrent', currentIndex)
		},
		setStatus(context, isPlay) {
			context.commit('setStatus', isPlay)
		}
	}
})
export default store