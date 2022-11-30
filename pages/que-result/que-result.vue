<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="main">
			<view class="scAndLe">
				<view class="score">
					耳鸣评价（TEQ）总分：
					<text class="color fs-45">{{ score }}</text>分
				</view>
				
				<view class="level">耳鸣严重程度分级：{{ level }}</view>
			</view>
			<view class="history">
				<text>历史评估记录</text>
			</view>
			<scroll-view scroll-y="true" class="scroll-content">
				<view v-for="(item, index) in queHistory" :key="index">
					<view class="scroll-item">
						<text class="scroll-score color">{{ item.score }}</text>
						<text class="color">分</text>
						<view class="time">
							<text>评估时间：</text>
							<uni-dateformat :date="item.time" format="yyyy/MM/dd"></uni-dateformat>
						</view>
					</view>
				</view>
			</scroll-view>
			<view class="btn">
				<view class="next" @tap="next">
					<button>完成评估</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				score: 0,
				queHistory: []
			}
		},
		onLoad(options) {
			this.score = options.queResult
			uniCloud.callFunction({
				name: 'get_queHistory',
				data: {
					phone: store.state.userinfo.phone
				}
			}).then(res => {
				console.log(res);
				this.queHistory = res.result.data
			}).catch(err => {
				console.log(err);
			})
		},
		computed: {
			level: function() {
				if(this.score <= 3) return 'I级（1级）'
				else if(this.score >= 4 && this.score <= 7) return 'II级（2级）'
				else if(this.score >= 8 && this.score <= 11 ) return 'III级（3级）'
				else if(this.score >= 12 && this.score <= 15) return 'IV级（4级）'
				else return 'V级（5级）'
			}
		},
		methods: {
			next() {
				uni.switchTab({
					url: '/pages/index/index'
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.scroll-content {
	  width: 92%;
	  height: 450rpx;
		position: relative;
		top: 8%;
		left: 3%;
	}
	.scroll-item {
	  display: inline-block;
		width: 99%;
		height: 130rpx;
		background-color: #fff;
		box-shadow: 0 0 1rpx 1rpx rgba(0, 0, 0, 0.5);
		margin-left: 5rpx;
		margin-top: 10rpx;
		border-radius: 20rpx;
	}
.content {
	width: 100vw;
	height: 100vh;
	.img {
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.main {
		width: 100%;
		height: 100%;
		.scAndLe {
			background-color: #fff;
			width: 700rpx;
			height: 300rpx;
			border-radius: 40rpx;
			box-shadow: 0 0 50rpx 2rpx rgba(0, 0, 0, 0.5);
			position: relative;
			top: 4%;
			left: 3%;
			.score {
				font-size: 40rpx;
				padding-top: 60rpx;
				padding-left: 80rpx;
			}
			.level {
				margin-top: 40rpx;
				font-size: 40rpx;
				padding-left: 80rpx;
			}
		}
		.history {
			font-size: 40rpx;
			position: relative;
			top: 80rpx;
			left: 3%;
			
		}
		
	}
}
.scroll-score {
	font-size: 45rpx;
	margin-top: 30rpx;
	padding-left: 30rpx;
	padding-right: 10rpx;
}
.color {
	color: #F9921C;
}
.fs-45 {
	font-size: 50rpx;
}
.time {
	margin-left: 30rpx;
	
}
.btn {
	display: flex;
	width: 100%;
	justify-content: space-around;
	position: fixed;
	bottom: 10%;
}
.next button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
}
</style>
