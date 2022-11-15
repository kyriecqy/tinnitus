<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="warn" v-if="!isDia">
		</view>
		<view class="main" v-else>
			<view class="item" v-for="(item, index) in music_list" :key="index" @tap="play(index)">
			  <view class="transition"></view>
			  <view class="gradient"></view>
			  <view class="label">
					<view class="name">{{ item.name }}</view>
					<view class="author">--{{ item.author }}</view>
				</view>
				<image class="bg" :src="item.pic" mode=""></image>
			</view>
		</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog cancelText="取消" confirmText="确认" title="提醒" content="暂无治疗方案,请前往诊断" @confirm="confirm"
				@close="close"></uni-popup-dialog>
		</uni-popup>
		
		<uni-popup ref="musicDetail" backgroundColor="#eee" type="bottom">
			<view class="popup-content">
				<image class="pop-img" :src="currentObj.pic"></image>
				<view class="title">
					{{ currentObj.name }}
				</view>
				<view class="clock">
					<image src="../../static/icon/clock.png"></image>
				</view>
				<view class="play-controll">
					<image src="../../static/icon/music_before.png" @tap="beforeMus" class="side"></image>
					<image :src="isPlay == true ? '../../static/icon/music_play.png' : '../../static/icon/music_stop.png'" 
					       class="center"
								 @tap="click"
					></image>
					<image src="../../static/icon/music_next.png" @tap="nextMus" class="side"></image>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="clock" backgroundColor="#eee"  type="center">
			<view class="clock-content">
				<text>设置治疗时间</text>
				<uni-data-checkbox :localdata="time" v-model="selectTime"></uni-data-checkbox>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import store from '../../store/index.js';
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				music_list: [
					{
						name: '',
						pic: '',
						url: '',
						author: ''
					}
				],
				isDia: false, //是否诊断过
				isPlay: false, //是否在播放音乐
				currentIndex: 0,
				currentObj: {},
				time: [
					{
						text: '不设置',
						value: 0
					},
					{
						text: '30分钟',
						value: 30
					},
					{
						text: '一个小时',
						value: 60
					},
					{
						text: '90分钟',
						value: 90
					},
					{
						text: '两个小时'
					}
				],
				selectTime: 0
			}
		},
		onLoad() {
			this.getTreat()
		},
		methods: {
			getTreat() {
				if(store.state.userinfo.phone !== '') {
					uniCloud.callFunction({
						name: 'get_treat',
						data: {
							phone: store.state.userinfo.phone
						}
					}).then(res => {
						//console.log(res);
						this.music_list = res.result.music_list
						this.isDia = res.result.isDia
						this.open()
						this.musicLoop()
					})
				}
			},
			play(index) {
				this.currentObj = this.music_list[index]
				innerAudioContext.src = this.music_list[index].url
				innerAudioContext.play()
				this.currentIndex = index
				this.isPlay = true
				this.$refs.musicDetail.open()
			},
			open() {
				if(this.isDia == false) {
					this.$refs.popup.open()
				}
			},
			confirm() {
				this.$refs.popup.close()
				uni.redirectTo({
					url: '/pages/diagnosis/diagnosis'
				})
			},
			close() {
				this.$refs.popup.close()
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			openClock() {
				this.$refs.clock.open()
			},
			confirmClock() {
				this.$refs.clock.close()
			},
			closeClock() {
				this.$refs.clock.close()
			},
			//歌曲详情控制播放
			click() {
				if(this.isPlay == true) {
					this.isPlay = false
					innerAudioContext.pause()
				}else {
					this.isPlay = true
					innerAudioContext.play()
				}
			},
			//上一首
			beforeMus() {
				if(this.currentIndex >= 1) {
					this.currentIndex -= 1
					this.currentObj = this.music_list[this.currentIndex]
					innerAudioContext.src = this.music_list[this.currentIndex].url
					innerAudioContext.play()
					this.isPlay = true
				}
			},
			//下一首
			nextMus() {
				let lastIndex = this.music_list.length - 1
				if(this.currentIndex <= lastIndex - 1) {
					this.currentIndex += 1
					this.currentObj = this.music_list[this.currentIndex]
					innerAudioContext.src = this.music_list[this.currentIndex].url
					innerAudioContext.play()
					this.isPlay = true
				}
			},
			musicLoop() {
				let len = this.music_list.length - 1
				innerAudioContext.onEnded(() => {
					if(this.currentIndex <= len - 1) {
						this.currentIndex += 1
						this.currentObj = this.music_list[this.currentIndex]
					}else {
						this.currentPlayIndex = 0
						this.currentObj = this.music_list[this.currentIndex]
					}
					innerAudioContext.src =this.music_list[this.currentIndex].url
					innerAudioContext.play()
					this.isPlay = true
				})
			}
		}
	}
</script>

<style scoped>
.content {
	width: 100vw;
	height: 100vh;
}
.img {
		opacity: 0.8;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.bg {
		width: 100%;
		height: 100%;
		opacity: 0.8;
	}
.warn {
}
.main {
	position: relative;
	width: 96%;
	left: 2%;
	top: 5%;
}
.item {
 font-size: 17px;
 width: 700rpx;
 height: 230rpx;
 font-weight: 500;
 margin-left: 12rpx;
 margin-bottom: 30rpx;
 border: none;
 position: relative;
 overflow: hidden;
 border-radius: 0.6em;
}

.gradient {
 position: absolute;
 width: 100%;
 height: 100%;
 left: 0;
 top: 0;
 border-radius: 0.6em;
 margin-top: -0.25em;
}

.label {
 position: fixed;
 z-index: 10;
 color: white;
 display: flex;
}
.name {
	font-size: 50rpx;
	margin-left: 50rpx;
	margin-top: 75rpx;
}
.author {
	font-size: 45rpx;
	margin-top: 85rpx;
	margin-left: 30rpx;
}

.item:active {
 transform: scale(0.97);
}
.popup-content {
	height: 1200rpx;
	width: 100%;
	
}
.pop-img {
	width: 80%;
	border-radius: 20rpx;
	height: 60%;
	left: 10%;
	top: 60rpx;
}
.title {
	font-size: 45rpx;
	margin-left: 300rpx;
	margin-top: 80rpx;
}
.play-controll {
	display: flex;
	margin-top: 110rpx;
	margin-left: 210rpx;
}
.play-controll image {
	width: 90rpx;
	height: 90rpx;
}
.center {
	margin: 0 40rpx;
}
.side:active {
 transform: scale(0.97);
}
.clock {
	position: fixed;
	left: 5%;
	bottom: 10%;
}
.clock image {
	width: 90rpx;
	height: 90rpx;
}
.clock-content {
	border-radius: 30rpx;
	text-align: center;
	width: 400rpx;
	height: 500rpx;
	font-size: 40rpx;
}
</style>
