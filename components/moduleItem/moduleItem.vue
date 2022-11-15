<template>
	<view :class="['content', index === 3 ? '' : 'border-bottom']">
		
		<view class="left-item" >
			<image :src="moduleData.iconPath" mode=""></image>
			<text>{{ moduleData.title }}</text>
		</view>
		<view class="right-item">
			<image src="../../static/icon/yjt.png" mode=""></image>
		</view>
	</view>
</template>

<script>
	export default {
		name:"moduleItem",
		props: ['moduleData', 'index'],
		data() {
			return {
			};
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	justify-content: space-between;
	text-align: center;
	width: 90%;
	margin-left: 32rpx;
	height: 100rpx;
	line-height: 100rpx;
	.left-item {
		display: flex;
		text {
			padding-left: 20rpx;
			font-size: 40rpx;
			font-weight: 900;
			color: #000;
		}
	}
	image {
		width: 50rpx;
		height: 50rpx;
		color: #8c8c8c;
		margin-top: 25rpx;
	}
}
.border-bottom {
	border-bottom: 1px solid #8c8c8c;
}
</style>