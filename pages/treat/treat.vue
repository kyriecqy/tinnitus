<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="warn" v-if="!isDia">
		</view>
		<view class="main" v-else v-show="!isLoad">
			<view class="item" v-for="(item, index) in music_list" :key="index" @tap="goDetail(index)">
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
		
		<uni-popup ref="clock" backgroundColor="#eee"  type="center">
			<view class="clock-content">
				<text>设置治疗时间</text>
				<uni-data-checkbox :localdata="time" v-model="selectTime"></uni-data-checkbox>
			</view>
		</uni-popup>
		
		<view class="load">
			<u-loading-page :loading="isLoad" bgColor="rgba(0, 0, 0, 0.3)" fontSize="25" color="#fff" loadingColor="#fff" iconSize="30"></u-loading-page>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js';
	let innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				isLoad: true,
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
						store.dispatch('setList', this.music_list)
						this.isDia = res.result.isDia
						this.isLoad = false
						this.open()
					})
				}
			},
			goDetail(index) {
				store.dispatch('setCurrent', index)
				store.dispatch('setStatus', true)
				store.state.musicinfo.music.src = this.music_list[index].url
				store.state.musicinfo.music.play()
				let info = encodeURIComponent(JSON.stringify(this.music_list))
				uni.navigateTo({
					url: '/pages/music-detail/music-detail?info=' + info
				})
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
 transform: scale(1.15);
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
