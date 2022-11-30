<template>
	<view class="content">
		<image class="img" src="../../static/img/login.webp" mode='center'></image>
		<view class="main">
			<view>
				<image src="../../static/img/logo.png" mode="" class="icon"></image>
			</view>
			<view class="title">智 耳 鸣</view>
			<text class='typewriter'>{{ typewriter }}</text>
			<view class="login" @tap="login">
				<button>登录/注册</button>
			</view>
		</view>
		<view class="load">
			<u-loading-page :loading="isLoad" bgColor="rgba(0, 0, 0, 0.3)" fontSize="25" color="#fff" loadingColor="#fff" iconSize="30"></u-loading-page>
		</view>
	</view>
</template>

<script>
	import store from '@/store/index.js';
	export default {
		data() {
			return {
				userinfo: {},
				typewriter: '',
				i: 0,
				timer: 0,
				str: '智耳鸣是一款缓解老年性耳鸣的声治疗App',
				isLoad: false
			}
		},
		onLoad() {
			this.typeing()
		},
		methods: {
			login() {
				
				uni.login({
					provider: 'univerify',
					univerifyStyle: {
						fullScreen: false,
						icon: {
							path: 'static/img/logo1.png'
						}
					},
					success: (res) => { // 登录成功
					  this.isLoad = true
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
								this.isLoad = false
								uni.navigateTo({
									url: '/pages/register-info1/register-info1?userinfo=' + encodeURIComponent(info)
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
			},
			typeing () {
			    if (this.i <= this.str.length) {
			      this.typewriter = this.str.slice(0, this.i++) + '_'
			      this.timer = setTimeout(() => {
			        this.typeing()
			      }, 150)
			   } else {
			      clearTimeout(this.timer)
						setTimeout(() => {
							this.typewriter = ''
							this.i = 0
							this.typeing()
						}, 1000)
			   }
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
	.main {
		width: 600rpx;
		height: 1000rpx;
		border-radius: 20rpx;
		position: fixed;
		top: 17%;
		left: 10%;
		.load {
			z-index: 100;
			position: fixed;
			left: 35%;
			top: 40%;
		}
	  .icon {
			width: 250rpx;
			height: 160rpx;
			background-color: #fff;
			border-radius: 20%;
			position: fixed;
			left: 32%;
			top: 16%;
			z-index: 4;
		}
	  .typewriter {
			font-size: 45rpx;
			position: fixed;
			width: 600rpx;
			left: 12%;
			top: 42%;
		}
		.title {
			 font-size: 80rpx;
			 font-weight: 900;
			 position: fixed;
			 left: 31%;
			 top: 28%;
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
			bottom: 25%;
			button {
				font-size: 50rpx;
				font-weight: 600;
				width: 500rpx;
				border-radius: 90rpx;
				border: 1px solid white;
				box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
				margin-top: 200rpx;
			}
		}
	}
	.load {
		z-index: 100;
	}
}
</style>
