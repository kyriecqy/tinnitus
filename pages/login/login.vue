<template>
	<view class="content">
		<image class="img" src="../../static/img/login.webp" mode='center'></image>
		<!-- <view class="bg"></view> -->
		<view class="main">
			<!--
			<view class="title">登录/注册</view>
			<view class="phone">
				<text>手机号码</text>
				<input type="number" placeholder="请输入手机号码" focus>
			</view>
			<view class="code">
				<text>短信验证码</text>
				<input type="number">
				<view class="get-code">
					<text class="code-item">获取验证码</text>
				</view>
			</view>
			-->
			<view class="login" @tap="login">
				<button>登录/注册</button>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				userinfo: {}
			}
		},
		onLoad() {
		},
		methods: {
			login() {
				uni.login({
					provider: 'univerify',
					univerifyStyle: {
						fullScreen: true
					},
					success(res){ // 登录成功
						//console.log(res.authResult);  // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
						uniCloud.callFunction({
							name: 'getPhoneNumber',
							data: res.authResult
						}).then(result => {
							//console.log("result", result.result);
							this.userinfo = result.result
							if(this.userinfo.isRegister == false) {
								//console.log('old', this.userinfo);
								let { _id, ...info} = this.userinfo.data
								info.id = _id
								//console.log('info', info);
								store.dispatch('setUser', info)
								uni.switchTab({
									url: '/pages/index/index'
								})
							}else {
								console.log('login', this.userinfo);
								let info = JSON.stringify(this.userinfo)
								uni.navigateTo({
									url: '/pages/register-info1/register-info1?userinfo=' + encodeURIComponent(info)
									//url: '/pages/register-info1/register-info1'
								})
							}
							
						}) 
					},
					fail(res){  // 登录失败
						console.log(res.errCode)
						console.log(res.errMsg)
					},
					complete() {
						uni.closeAuthView() //关闭授权登录界面
					}
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
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0.3;
		z-index: -1;
	}
	/*
	.bg {
		height: 60%;
		width: 100%;
		background-color: #F9921C;
		opacity: 0.8;
		border-bottom-left-radius: 25%;
		border-bottom-right-radius: 25%;
	}
	*/
	.main {
		width: 600rpx;
		height: 1000rpx;
		//background-color: #eee;
		border-radius: 20rpx;
		position: fixed;
		top: 17%;
		left: 10%;
		.title {
			font-size: 60rpx;
			font-weight: 900;
			margin-top: 30rpx;
			margin-left: 30rpx;
		}
		.phone {
			font-size: 45rpx;
			margin-top: 60rpx;
			margin-left: 30rpx;
			input {
				min-height: 80rpx;
				border-bottom: 1px solid #9a9a9a;
				height: 80rpx;
				margin-top: 10rpx;
				width: 540rpx;
			}
		}
		.code {
			margin-top: 80rpx;
			font-size: 45rpx;
			margin-left: 30rpx;
			input {
				min-height: 80rpx;
				border-bottom: 1px solid #9a9a9a;
				height: 80rpx;
				margin-top: 10rpx;
				width: 540rpx;
			}
			.get-code {
				position: fixed;
				top: 47%;
				right: 15%;
				.code-item {
					font-size: 30rpx;
				}
			}
		}
		.login {
			position: fixed;
			left: 18%;
			bottom: 30%;
			button {
				font-size: 40rpx;
				width: 500rpx;
				background-color: #F9921C;
				border-radius: 90rpx;
				border: 1px solid white;
				box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
				margin-top: 200rpx;
			}
		}
	}
}
</style>
