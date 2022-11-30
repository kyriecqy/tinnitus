<template>
	<view class="content">
		<image class="img" src="../../static/img/bg-trs.webp" mode=""></image>
		<view class="topNav">
			<image src="../../static/icon/zjt.png" @tap="back" class="left-arrow"></image>
		</view>
		<view class="center">
			<text>TRS助眠音乐</text>
		</view>
		<view class="main" v-show="!isLoad">
			<scroll-view scroll-y="true" class="scroll-content">
				<view v-for="(item, index) in musicList" :key="index">
					<view class="music-item" @tap="goDetail(index)"> 
						<view class="music-img">
							<image :src="item.pic" mode=""></image>
						</view>
						<view class="text">
							<view class="title">{{ item.name }}</view>
							<view class="author">{{ item.author }}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		
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
				musicList: [
					{
						name: '',
						url: '',
						author: '',
						pic: ''
					}
				],
				isPlay: false,
				currentPlayIndex: 0,
				isLoad: true
			}
		},
		onLoad() {
			this.getMusic()
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
					store.dispatch('setList', this.musicList)
					innerAudioContext.src = this.musicList[0].url
					this.isLoad = false
				})
			},
			//前往音乐详情页，并播放
			goDetail(index) {
				store.dispatch('setCurrent', index)
				store.dispatch('setStatus', true)
				store.state.musicinfo.music.src = this.musicList[index].url
				store.state.musicinfo.music.play()
				let info = encodeURIComponent(JSON.stringify(this.musicList))
				uni.navigateTo({
					url: '/pages/music-detail/music-detail?info=' + info
				})
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
		padding-top: 120rpx;
		height: 60rpx;
		width: 100%;
		.left-arrow {
			width: 60rpx;
			height: 50rpx;
			padding-left: 20rpx;
		}
		.left-arrow:active {
			transform: scale(1.2);
		}
		.clock {
			width: 80rpx;
			height: 80rpx;
			position: fixed;
			right: 30rpx;
			top: 100rpx;
		}
	}
	.center {
		color: #f8f8f8;
		font-size: 75rpx;
		padding-left: 80rpx;
		padding-top: 120rpx;
	}
	.main {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 1100rpx;
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
				font-size: 45rpx;
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
	.load {
		z-index: 100;
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
