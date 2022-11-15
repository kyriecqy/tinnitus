<template>
	<view class="content">
		<view class="main">
			<view class="avatar">
				<view class="avatar-item">
					<image src="../../static/img/bg.webp" mode=""></image>
				</view>
				<view class="right">
					<text>修改头像</text>
					<image src="../../static/icon/yjt.png" mode=""></image>
				</view>
			</view>
			<view class="item" v-for="(item, index) in itemList" :key="index">
				<view class="left">
					<text>{{ item.title }}</text>
				</view>
				<view class="right">
					<text>{{ item.content }}</text>
				</view>
			</view>
		</view>
		<view class="save" @tap="save">
			<u-button 
			  text="保存" 
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
				itemList: [
					{
						title: '用户名',
						content: ''
					},
				  {
					  title: '手机号',
						content: ''
				  },
				  {
					  title: '性别',
						content: ''
				  },
				  {
					  title: '出生日期',
						content: ''
				  }
				],
				userinfo: {}
			}
		},
		onLoad() {
			this.userinfo = store.state.userinfo
			this.itemList[0].content = this.userinfo.name
			this.itemList[1].content = this.userinfo.phone
			this.itemList[2].content = this.userinfo.gender == 'man' ? '男' : '女'
			this.itemList[3].content = this.userinfo.birth
		},
		methods: {
			//保存并返回
			save() {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			}
		}
	}
</script>

<style scoped lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	background-color: #eee;
	.main {
		width: 700rpx;
		border-radius: 20rpx;
		background-color: #fff;
		position: relative;
		top: 20rpx;
		left: 25rpx;
		.avatar {
			width: 680rpx;
			margin-left: 10rpx;
			height: 120rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #d6d6d6;
			.avatar-item {
				padding-left: 30rpx;
				image {
					width: 90rpx;
					height: 90rpx;
					margin-top: 15rpx;
					border-radius: 90%;
				}
			}
			.right {
				line-height: 120rpx;
				text {
					font-size: 40rpx;
					padding-right: 40rpx;
				}
				image {
					width: 50rpx;
					height: 50rpx;
					position: relative;
					top: 10rpx;
					right: 20rpx;
				}
			}
		}
	  .item {
			height: 100rpx;
			width: 680rpx;
			margin-left: 10rpx;
			display: flex;
			justify-content: space-between;
			border-bottom: 1px solid #d6d6d6;
			font-size: 40rpx;
			line-height: 100rpx;
			.left {
				padding-left: 30rpx;
			}
			.right {
				padding-right: 30rpx;
			}
		}
	}
	.save {
		width: 500rpx;
		position: fixed;
		bottom: 80rpx;
		left: 125rpx;
	}	
}

</style>
