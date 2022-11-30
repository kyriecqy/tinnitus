<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="main">
			<view class="item first">
				<view class="title">
					<image src="../../static/icon/result.png"></image>
					<text>耳鸣部位：</text>
				</view>
				<text class="value">{{ music_select.place }}</text>
			</view>
			<view class="item">
				<view class="title">
					<image src="../../static/icon/result.png"></image>
					<text>耳鸣频率：</text>
				</view>
				<text class="value">{{ hz_str }}</text>
			</view>
			<view class="item">
				<view class="title">
					<image src="../../static/icon/result.png"></image>
					<text>严重程度：</text>
				</view>
				<text class="value">四级</text>
			</view>
		</view>
    <view class="btn">
    	<view class="back" @tap="back">
    		<button>返回首页</button>
    	</view>
    	<view class="next" @tap="next">
    		<button>前往治疗</button>
    	</view>
    </view>	
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				music_select: '',
				hz_str: [],
				level_arr: [],
				treat_level: {
					level: []
				},
				isOk: false
			}
		},
		onLoad(options) {
			let info = JSON.parse(decodeURIComponent(options.music_select))
			this.music_select = info
			console.log(this.music_select);
			this.get_hz()
		},
		methods: {
			get_hz() {
				let c_hz, z_hz, c_level, z_level
				if(this.music_select.c_level !== '') {
					c_level = this.music_select.c_level.split(' ')[0]
					c_hz = this.music_select.c_level.split(' ')[1]
					this.hz_str.push(c_hz)
					this.level_arr.push(c_level)
				}
				if(this.music_select.z_level !== '') {
					z_level = this.music_select.z_level.split(' ')[0]
					z_hz = this.music_select.z_level.split(' ')[1]
					this.hz_str.push(z_hz)
					this.level_arr.push(z_level)
				}
				this.hz_str = this.hz_str.join(',')
				this.treat_level.phone = store.state.userinfo.phone
				/*
				if(this.level_arr[0] == this.level_arr[1]) {
					this.treat_level.level.push(this.level_arr[0])
				}else {
					
				}
				*/
				this.treat_level.level = this.level_arr
				//console.log(this.treat_level);
				//console.log(this.level_str);
			},
			next() {
				this.addOrUpdateTreat1()
			},
			back() {
				this.addOrUpdateTreat()
				uni.switchTab({
					url: '/pages/index/index'
				})
				
			},
			addOrUpdateTreat() {
				uniCloud.callFunction({
					name: 'add_or_update__treat',
					data: {
						...this.treat_level
					}
				})
			},
			addOrUpdateTreat1() { //解决add_or_update_treat还没返回结果就调用get_treat的问题
				uniCloud.callFunction({
					name: 'add_or_update__treat',
					data: {
						...this.treat_level
					}
				}).then(() => {
					uni.navigateTo({
						url: '/pages/treat/treat'
					})
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
		z-index: -1;
	}
	.main {
		margin-top: 30%;
		margin-left: 4%;
	  width: 92%;
	  height: 500rpx;
	  background: #fff;//rgb(236, 236, 236);
	  box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
		.first {
			padding-top: 37rpx;
		}
		.item {
			display: flex;
			width: 92%;
			height: 100rpx;
			margin-left: 4%;
			border-bottom: thick double #eee;
			margin-top: 40rpx;
			margin-bottom: 20rpx;
			.title {
				text {
					font-size: 45rpx;
					margin-left: 10rpx;
				}
				image {
					width: 50rpx;
					height: 50rpx;
					padding-top: 20rpx;
					top: 10rpx;
				}
			}
			.value {
				font-size: 45rpx;
				font-weight: 700;
				margin-top: 20rpx;
			}
		}
	}
	.btn {
		display: flex;
		width: 100%;
		justify-content: space-around;
		position: fixed;
		bottom: 20%;
	}
	.back button {
		font-size: 40rpx;
		width: 300rpx;
		background-color: #F9921C;
		border-radius: 90rpx;
		border: 1px solid white;
		box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	}
	.next button {
		font-size: 40rpx;
		width: 300rpx;
		background-color: #F9921C;
		border-radius: 90rpx;
		border: 1px solid white;
		box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	}
}
</style>
