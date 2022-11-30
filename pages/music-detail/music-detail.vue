<template>
	<view class="content">
		<image class="img" :src="pic" mode=""></image>
		<view class="topNav">
			<image src="../../static/icon/zjt.png" @tap="back" class="left-arrow"></image>
			<image :src="stopTime != 0 ? '../../static/icon/clock-yellow.png' : '../../static/icon/clock.png'" @tap="setClock" class="clock"></image>
		</view>
		<view class="center">
			<image :src="pic" class="center_img"></image>
		</view>
		<view class="container">
			<view class="title">{{ currentMuisc.name }}</view>
			<view class="iconList">
				<image class="container-img" src="../../static/icon/music_before.png" @tap="before"></image>
				<image class="container-img mar" :src="isPlay ? '../../static/icon/music_play.png' : '../../static/icon/music_stop.png'" @tap="controll"></image>
				<image class="container-img" src="../../static/icon/music_next.png" @tap="next"></image>
				<image class="list" src="../../static/icon/list.png" @tap="open"></image>
			</view>
		</view>
		
		<u-popup :show="show" :round="10" mode="bottom" @open="open" @close="close">
			<view class="popup-content">
				<scroll-view scroll-y="true" class="scroll-content">
				  <view v-for="(item, index) in musicList" :key="index">
					  <view :class="['popup-item', index == 0 ? 'first' : '']">
					  	<view class="item-name">
					  		{{ item.name }}
					  	</view>
					  	<view class="item-author">
					  		-{{ item.author }}
					  	</view>
					  </view>
				  </view>
				</scroll-view>
			</view>	
		</u-popup>
		
		<u-picker :show="show_clock" :columns="columns" keyName="label" @confirm="confirm" @cancel="cancel"></u-picker>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				musicList: [
					{
						name: '',
						url: ''
					}
				],
				currentMuisc: {
					name: '',
					url: ''
				},
				isPlay: store.state.musicinfo.isPlay,
				pic: '',
				show: false,
				stopTime: store.state.musicinfo.stopTime,
				setTimeoutId: '',
				columns: [
					[
						{
						  label: '不设置',
						  id: 0
					  }, 
						{
							label: '30分钟',
							id: 30
						},
						{
						  label: '一个小时',
						  id: 60
						}, 
						{
						  label: '90分钟',
						  id: 90
						}, 
						{
						  label: '两个小时',
						  id: 120
						}
					]
				],
				show_clock: false
			}
		},
		onLoad(options) {
			let info = JSON.parse(decodeURIComponent(options.info))
			this.currentMuisc = store.state.musicinfo.list[store.state.musicinfo.currentIndex]
			this.musicList = info
			this.pic = this.currentMuisc.pic
			this.musicLoop()
		},
		methods: {
			//回到首页
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			//播放或停止
			controll() {
				if(this.isPlay) { //需要停止
					this.isPlay = false
					store.dispatch('setStatus', false)
					store.state.musicinfo.music.pause()
				}else {
					this.isPlay = true
					store.dispatch('setStatus', true)
					store.state.musicinfo.music.play()
				}
			},
			//上一首
			before() {
				let musicinfo = store.state.musicinfo
				if(musicinfo.currentIndex >= 1) {
					musicinfo.currentIndex -= 1 //修改store中的当前音乐索引
					this.currentMuisc = musicinfo.list[musicinfo.currentIndex] //获取当前音乐信息
					musicinfo.music.src =musicinfo.list[musicinfo.currentIndex].url //设置src
					musicinfo.music.play()
					this.pic = this.currentMuisc.pic
					this.isPlay = true //设置状态
					store.dispatch('setStatus', true) //改变store中状态
				}
			},
			//下一首
			next() {
				let musicinfo = store.state.musicinfo 
				let lastIndex = musicinfo.list.length - 1
				if(musicinfo.currentIndex <= lastIndex - 1) {
					musicinfo.currentIndex += 1
					this.currentMuisc = musicinfo.list[musicinfo.currentIndex]
					musicinfo.music.src =musicinfo.list[musicinfo.currentIndex].url
					musicinfo.music.play()
					this.pic = this.currentMuisc.pic
					this.isPlay = true
					store.dispatch('setStatus', true)
				}
			},
			//打开列表
			open() {
				this.show = true
			},
			close() {
				this.show = false
			},
			//循环播放列表
			musicLoop() {
				let musicinfo = store.state.musicinfo
				let len = this.musicList.length - 1
				musicinfo.music.onEnded(() => {
					if(musicinfo.currentIndex <= len - 1) {
						musicinfo.currentIndex += 1
						this.currentMuisc = musicinfo.list[musicinfo.currentIndex]
						this.pic = this.currentMuisc.pic
					}else {
						musicinfo.currentIndex = 0
						this.currentMuisc = musicinfo.list[musicinfo.currentIndex]
						this.pic = this.currentMuisc.pic
					}
					musicinfo.music.src =musicinfo.list[musicinfo.currentIndex].url
					musicinfo.music.play()
					this.isPlay = true
				})
			},
			setClock() {
				this.show_clock = true
			},
			confirm(e) {
				console.log(e);
				this.show_clock = false
				clearTimeout(this.setTimeoutId) //关闭前一个定时器
				this.stopTime = e.value[0].id
				store.state.musicinfo.stopTime = e.value[0].id
				if(e.value[0].id == 0) return;
				let ms = e.value[0].id * 60 * 1000
				this.setTimeoutId = setTimeout(() => {
					store.state.musicinfo.music.stop()
					this.stopTime = 0
					store.state.musicinfo.stopTime = 0
					store.state.musicinfo.isPlay = false
					this.isPlay = false
				}, ms)
			},
			cancel() {
				this.show_clock = false
			}
		}
	}
</script>

<style scoped lang="scss">
.content {
	width: 100%;
	height: 100%;
	.img {
		opacity: 0.8;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.5;
	}
	.topNav {
		padding-top: 120rpx;
		height: 60rpx;
		width: 100%;
		.left-arrow {
			width: 60rpx;
			height: 50rpx;
			padding-left: 20rpx;
			z-index: 4;
		}
		.left-arrow:active {
			transform: scale(1.2);
		}
		.clock {
			width: 80rpx;
			height: 80rpx;
			position: fixed;
			right: 40rpx;
			top: 110rpx;
		}
		.clock:active {
			transform: scale(1.1);
		}
	}
	.center {
		width: 70%;
		height: 50%;
		border-radius: 20rpx;
		position: fixed;
		top: 15%;
		left: 15%;
		overflow: hidden;
		.center_img {
			width:1000rpx;
			height: 1000rpx;
		}
	}
	.container {
		position: fixed;
		bottom: 10%;
		left: 22%;
		.title {
			font-size: 65rpx;
			margin-bottom: 120rpx;
			text-align: center;
			margin-right: 135rpx;
		}
		.iconList {
			display: flex;
			.container-img {
				width: 120rpx;
				height: 120rpx;
			}
			.container-img:active {
			  transform: scale(1.2);
			}
			.mar {
				margin: 0 30rpx;
			}
			.list {
				width: 80rpx;
				height: 80rpx;
				margin-top: 25rpx;
				margin-left: 40rpx;
			}
			.list:active {
				transform: scale(1.2);
			}
		}
	}
}

.popup-content {
	width: 100%;
	height: 850rpx;
	.scroll-content {
		  width: 100%;
		  height: 100%;
		}
	.first {
		margin-top: 20rpx;
	}
	.popup-item {
		width: 86%;
		height: 120rpx;
		border-bottom: 1px solid #eee;
		margin-left: 7%;
		display: flex;
		line-height: 120rpx;
		.item-name {
			font-size: 60rpx;
		}
		.item-author {
			font-size: 45rpx;
			color: #a6a6a6;
			margin-left: 20rpx;
		}
	}
}
</style>
