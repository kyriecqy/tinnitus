<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="user">
			<view class="avatar">
				<image src="../../static/img/mr-avatar.png" mode=""></image>
			</view>
			<view class="name">
				KyrieC
			</view>
		</view>
		<view class="module">
			<view class="module-item" v-for="(item, index) in moduleList" :key="index" @tap="setUp(index)">
				<module-item :moduleData="item" :index="index"></module-item>
			</view>
		</view>
	</view>
</template>

<script>
	import moduleItem from '../../components/moduleItem/moduleItem.vue'
	export default {
		components: {
			moduleItem
		},
		data() {
			return {
				moduleList: [
					{
						iconPath: '../../static/icon/dangan.png',
						title: '耳鸣档案'
					},
					{
						iconPath: '../../static/icon/grxx.png',
						title: '个人信息'
					},
					{
						iconPath: '../../static/icon/fankui.png',
						title: '用户反馈'
					},
					{
						iconPath: '../../static/icon/sz.png',
						title: '设置'
					}
				],
			  pageList: [
					'/pages/archives/archives', 
					'/pages/perInformation/perInformation', 
					'/pages/feedback/feedback', 
					'/pages/setup/setup'
				]
			};
		},
		methods: {
			setUp(index) {
				uni.navigateTo({
					url: this.pageList[index]
				}).then(res => {
					
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.content {
	.img {
		opacity: 0.5;
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -11;
	}
	.user {
		width: 100vw;
		padding: 80rpx 0 40rpx 0;
		display: flex;
		flex-direction: column;
		text-align: center;
		.avatar {
		}
		.avatar image {
			width: 230rpx;
			height: 230rpx;
			border-radius: 50%;
		}
		.name {
			padding-top: 20rpx;
			font-size: 40rpx;
			font-weight: 900;
		}
	}
	.module {
		width: 90%;
		height: 405rpx;
		margin-left: 38rpx;
		background-color: white;
		border-radius: 20rpx;
		box-shadow: -10rpx -10rpx 50rpx 5rpx rgba(0, 0, 0, 0.5);
	}
}
</style>
