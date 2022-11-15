<template>
	<view class="content">
		<view class="main">
			<view class="about">关于我们</view>
			<view class="right-item">
				<image src="../../static/icon/yjt.png" mode=""></image>
			</view>
		</view>
		<view class="logout" @tap="logout">
			<u-button 
			  text="退出登录" 
				color="linear-gradient(to right, #f9b95e, #F9921C)"
				shape="circle"
				size="large"
			></u-button>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
			logout() {
				store.dispatch('clearUser')
				uni.reLaunch({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
	background-color: #eee;
	.main {
		width: 700rpx;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		position: relative;
		top: 50rpx;
		left: 25rpx;
		background-color: white;
		border-radius: 15rpx;
		display: flex;
		justify-content: space-between;
		.about {
			font-size: 35rpx;
			padding-left: 20rpx;
		}
		image {
			width: 50rpx;
			height: 50rpx;
			margin-top: 25rpx;
			padding-right: 20rpx;
		}
	}
	.logout {
		width: 500rpx;
		position: fixed;
		bottom: 80rpx;
		left: 125rpx;
	}
}
</style>
