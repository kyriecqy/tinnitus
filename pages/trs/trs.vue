<template>
	<view class="content">
		<image class="img" src="../../static/img/bg-trs.webp" mode=""></image>
		<view class="topNav">
			<image src="../../static/icon/zjt.png" @tap="back" class="left-arrow"></image>
			<image :src="stopTime != 0 ? '../../static/icon/clock-yellow.png' : '../../static/icon/clock.png'" @tap="setClock" class="clock"></image>
		</view>
		<view class="center">
			<text>TRS助眠音乐</text>
			<view class="play-contain">
				<image src="../../static/icon/before-mus.png" class="play-item2" @tap="beforeMus"></image>
				<image :src="isPlay ? '../../static/icon/play.png' : '../../static/icon/stop.png'" class="play-item1" @tap="change"></image>
				<image src="../../static/icon/next-mus.png" class="play-item2" @tap="nextMus"></image>
			</view>
			<view class="msg">当前播放：{{ musicList[currentPlayIndex].name }}</view>
		</view>
		<uni-load-more status="loading" v-if="isLoad"></uni-load-more>
		<view class="main" v-else>
			<scroll-view scroll-y="true" class="scroll-content">
				<view v-for="(item, index) in musicList" :key="index">
					<view class="music-item" @tap="select(index)">
						<view class="music-img">
							<image src="../../static/img/bg-trs.webp" mode=""></image>
						</view>
						<view class="text">
							<view class="title">{{ item.name }}</view>
							<view class="author">{{ item.author }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
		<uni-popup ref="popup" background-color="#fff" type="bottom">
			<view class="popup-content">
				<view class="popup-title">设置自动关闭时间</view>
				<view class="popup-main">
				  <view class="main-left" @tap="setTime">
						关闭时间：{{stopTime}}分钟后
					</view>
				</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popupTime" type="dialog">
			<uni-popup-dialog mode="input" title="设置关闭时间" :duration="2000" :before-close="true" @close="close" @confirm="confirm"></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	let innerAudioContext = uni.createInnerAudioContext();
	
	export default {
		data() {
			return {
				musicList: [
					{
						name: '',
						url: '',
						author: ''
					}
				],
				isPlay: false,
				currentPlayIndex: 0,
				isLoad: true,
				stopTime: 0,
				setTimeoutId: ''
			}
		},
		onLoad() {
			this.getMusic()
			innerAudioContext.onEnded(() => {
				let len = this.musicList.length - 1
				if(this.currentPlayIndex <= len - 1) {
					this.currentPlayIndex += 1
				}else {
					this.currentPlayIndex = 0
				}
				innerAudioContext.src =this.musicList[this.currentPlayIndex].url
				innerAudioContext.play()
				this.isPlay = true
			})
		},
		methods: {
			//回到首页
			back() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			},
			//从数据库获取全部歌曲
			getMusic() {
				uniCloud.callFunction({
					name: 'get_trs'
				}).then(res => {
					this.musicList = res.result.data
					innerAudioContext.src = this.musicList[0].url
					this.isLoad = false
				})
			},
			//选择播放某一首
			select(index) {
				console.log(this.musicList[index]);
				innerAudioContext.src = this.musicList[index].url
				this.currentPlayIndex = index
				innerAudioContext.play()
				this.isPlay = true
			},
			//总体是否播放
			change() {
				if(this.isPlay) {
					innerAudioContext.pause()
					this.isPlay = false
				}else {
					innerAudioContext.play()
					this.isPlay = true
				}
			},
			//上一首
			beforeMus() {
				if(this.currentPlayIndex >= 1) {
					this.currentPlayIndex -= 1
					innerAudioContext.src =this.musicList[this.currentPlayIndex].url
					innerAudioContext.play()
					this.isPlay = true
				}
				
			},
			//下一首
			nextMus() {
				let lastIndex = this.musicList.length - 1
				if(this.currentPlayIndex <=lastIndex - 1) {
					this.currentPlayIndex += 1
					innerAudioContext.src =this.musicList[this.currentPlayIndex].url
					innerAudioContext.play()
					this.isPlay = true
				}
			},
			setClock() {
				this.$refs.popup.open()
			},
			setTime() {
				this.$refs.popupTime.open()
			},
			confirm(e) {
				this.$refs.popupTime.close()
				clearTimeout(this.setTimeoutId) //关闭前一个定时器
				this.stopTime = e
				let ms = e * 60 * 1000
				this.setTimeoutId = setTimeout(() => {
					innerAudioContext.stop()
					this.stopTime = 0
					this.isPlay = false
				}, ms)
			},
			close() {
				this.$refs.popupTime.close()
			}
		}
	}
</script>

<style scoped lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	.img {
		opacity: 0.8;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.topNav {
		padding-top: 60rpx;
		height: 60rpx;
		width: 100%;
		.left-arrow {
			width: 50rpx;
			height: 40rpx;
			padding-left: 10rpx;
		}
		.clock {
			width: 50rpx;
			height: 50rpx;
			position: fixed;
			right: 30rpx;
			top: 55rpx;
		}
	}
	.center {
		color: #f8f8f8;
		font-size: 65rpx;
		padding-left: 60rpx;
		text {
			padding-left: 135rpx;
		}
		.play-contain {
			padding-left: 150rpx;
			margin-top: 20rpx;
			image {
				width: 90rpx;
				height: 90rpx;
			}
			.play-item1 {
				width: 110rpx;
				height: 110rpx;
				margin: 0 30rpx;
			}
			.play-item2 {
				margin-bottom: 10rpx;
			}
		}
		.msg {
			font-size: 40rpx;
			padding-left: 150rpx;
			margin-top: 10rpx;
		}
	}
	.main {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 850rpx;
		background-color: #f8f8f8;
		border-top-left-radius: 20rpx;
		border-top-right-radius: 20rpx;
		.scroll-content {
		  width: 100%;
		  height: 100%;
		}
		.music-item {
			width: 90%;
			height: 130rpx;
			margin: 10rpx 39rpx;
			display: flex;
			line-height: 130rpx;
			.text {
				display: flex;
				margin-left: 20rpx;
				font-size: 35rpx;
				.author {
					color: #717171;
					margin-left: 15rpx;
				}
			}
			.music-img image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 20rpx;
				margin-top: 15rpx;
				margin-left: 20rpx;
			}
		}
	}
}
.popup-content {
	width: 100%;
	height: 400rpx;
	.popup-title {
		font-size: 40rpx;
		margin: 30rpx 0 0 220rpx;
	}
	.popup-main {
		width: 85%;
		height: 150rpx;
		background-color: #F9921C;
		margin-left: 55rpx;
		margin-top: 70rpx;
		line-height: 150rpx;
		display: flex;
		border-radius: 40rpx;
		.main-left {
			font-size: 40rpx;
			margin-left: 30rpx;
		}
	}
}
</style>
