<template>
	<view class="content">
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/img/banner1.jpeg" mode=""></image>
				</view>
			</swiper-item>
			<swiper-item>
				<view class="swiper-item">
					<image src="../../static/img/banner3.jpeg" mode=""></image>
				</view>
			</swiper-item>
		</swiper>
		
	  <view class="bg">
	  	<image src="../../static/img/bg.webp" mode=""></image>
	  </view>
		
		<!-- 功能模块 -->
		<view class="diagnosis" @tap="goDia">
			<image src="../../static/icon/zd.png" mode=""></image>
			<text>耳鸣诊断</text>
		</view>
		<view class="question" @tap="goQue">
			<image src="../../static/icon/wj.png" mode=""></image>
			<text>治疗评估</text>
		</view>
		<view class="trs" @tap="goTrs">
			<image src="../../static/icon/zm.png" mode=""></image>
			<text>TRS助眠</text>
		</view>
		<view class="treat" @tap="goTreat">
			<image src="../../static/icon/zl.png" mode=""></image>
			<text>耳鸣治疗</text>
		</view>
	</view>
</template>

<script>
	let innerAudioContext = uni.createInnerAudioContext();
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				
			}
		},
		onLoad() {
			//console.log('index',store.state.userinfo);
		},
		methods: {
			toLogin() {
				if(!store.state.userinfo.phone) {
					uni.reLaunch({
						url: '/pages/login/login'
					})
					return true
				}
			},
      goQue() {
				if(this.toLogin()) return;
				uni.navigateTo({
					url: '/pages/question/question'
				})
			},
			goDia() {
				if(this.toLogin()) return;
				uni.navigateTo({
					url: '/pages/diagnosis/diagnosis'
				})
			},
			goTrs() {
				if(this.toLogin()) return;
				uni.navigateTo({
					url: '/pages/trs/trs'
				})
			},
			goTreat() {
				if(this.toLogin()) return;
			
				uni.navigateTo({
					url: '/pages/treat/treat'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	swiper {
		width: 100%;
		height: 350rpx;
		.swiper-item image {
			width: 100%;
		}
	}
	.content {
		width: 100vw;
		height: 100vh;
		.bg {
			position: fixed;
			left: 0;
			top: 350rpx;
			width: 100%;
			height: 100%;
			image {
				opacity: 0.5;
				width: 100%;
				height: 100%;
			}
		}
	}
	.diagnosis {
		width: 280rpx;
		height: 400rpx;
		position: fixed;
		top: 460rpx;
		left: 80rpx;
		background-color: #00557f;
		border-radius: 45rpx;
		box-shadow: -10rpx -10rpx 50rpx 5rpx rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		image {
			width: 150rpx;
			height: 150rpx;
			position: relative;
			top: 18%;
			left: 24%;
		}
		text {
			font-size: 45rpx;
			font-weight: 900;
			color: #fff;
			position: relative;
			top: 22%;
			left: 18%;
		}
	}
	.question {
		width: 250rpx;
		height: 280rpx;
		position: fixed;
		top: 460rpx;
		right: 90rpx;
		background-color: #d7ae1b;
		border-radius: 45rpx;
		box-shadow: -10rpx -10rpx 50rpx 5rpx rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		image {
			width: 130rpx;
			height: 130rpx;
			position: relative;
			top: 17%;
			left: 24%;
		}
		text {
			font-size: 40rpx;
			font-weight: 900;
			color: #fff;
			position: relative;
			top: 17%;
			left: 18%;
		}
	}
	.trs {
		width: 280rpx;
		height: 250rpx;
		position: fixed;
		top: 900rpx;
		left: 80rpx;
		background-color: green;
		border-radius: 45rpx;
		box-shadow: -10rpx -10rpx 50rpx 5rpx rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		image {
			width: 130rpx;
			height: 130rpx;
			position: relative;
			top: 15%;
			left: 24%;
		}
		text {
			font-size: 40rpx;
			font-weight: 900;
			color: #fff;
			position: relative;
			top: 15%;
			left: 19%;
		}
	}
	.treat {
		width: 250rpx;
		height: 360rpx;
		position: fixed;
		top: 790rpx;
		right: 90rpx;
		background-color: #49d608;
		border-radius: 45rpx;
		box-shadow: -10rpx -10rpx 50rpx 5rpx rgba(0, 0, 0, 0.5);
		display: flex;
		flex-direction: column;
		image {
			width: 130rpx;
			height: 130rpx;
			position: relative;
			top: 17%;
			left: 24%;
		}
		text {
			font-size: 40rpx;
			font-weight: 900;
			color: #fff;
			position: relative;
			top: 19%;
			left: 18%;
		}
	}
</style>
