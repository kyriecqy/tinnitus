<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="no_history">
			<text>暂无随访记录</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
.no_history {
	width: 100%;
	text-align: center;
	font-size: 50rpx;
	color: #bebebe;
}
</style>
