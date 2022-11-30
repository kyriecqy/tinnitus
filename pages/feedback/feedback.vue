<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="main">
			<view class="text">
				<text>可以将在使用本产品过程中的意见、建议或问题写在下方</text>
			</view>
			<view class="center">
				<view class="title">反馈内容：</view>
				<u--textarea class="textarea" height="250" v-model="value" placeholder="请输入您的建议或问题,我们会尽快为您解决问题" count></u--textarea>
			</view>
			<view class="submit" @tap="submit">
				<u-button 
				  text="提交" 
					color="linear-gradient(to right, #f9b95e, #F9921C)"
					shape="circle"
					size="large"
				></u-button>
			</view>
			<u-notify ref="uNotify"></u-notify>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				value: '',
				show: false
			}
		},
		methods: {
			submit() {
				if(this.value == '') {
					this.$refs.uNotify.show({
							top: 10,
							type: 'warning',
							color: '#000',
							message: '请输入内容',
							duration: 3000,
							fontSize: 27,
							safeAreaInsetTop:false
					})
					return;
				}
				uniCloud.callFunction({
					name: 'add_feedback',
					data: {
						phone: store.state.userinfo.phone,
						content: this.value,
						time: Date.now()
					}
				}).then(res => {
					this.$refs.uNotify.show({
							top: 10,
							type: 'success',
							color: '#000',
							message: '提交成功',
							duration: 3000,
							fontSize: 27,
							safeAreaInsetTop:false
					})
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/mine/mine'
						})
					}, 1000)
					this.value = ''
				}).catch(err => {
					console.log(err);
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
	width: 100vw;
	height: 100vh;
	.img {
		opacity: 0.8;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.main {
		width: 100%;
		height: 100%;
		.text {
			font-size: 50rpx;
			width: 90%;
			text-align: center;
			margin-left: 5%;
			padding-top: 10%;
		}
		.center {
			width: 90%;
			margin-left: 5%;
			border-radius: 20rpx;
			margin-top: 80rpx;
			height: 50%;
			background-color: #f3f3f3;
			.title {
				font-size: 50rpx;
				position: fixed;
				top: 22%;
				left: 61rpx;
			}
			.textarea {
				position: fixed;
				top: 28%;
				width: 78%;
	      margin-left: 30rpx;
			}
		}
		.submit {
		width: 500rpx;
		position: fixed;
		bottom: 150rpx;
		left: 125rpx;
	}
	}
}
</style>
