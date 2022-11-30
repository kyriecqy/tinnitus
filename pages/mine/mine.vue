<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="user">
			<view class="avatar">
				<image :src="avatar" mode=""></image>
			</view>
			<view class="name">
				{{ name }}
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
	import moduleItem from '../../components/moduleItem/moduleItem.vue';
	import store from '../../store/index.js';
	export default {
		components: {
			moduleItem
		},
		data() {
			return {
				moduleList: [
					{
						iconPath: '../../static/icon/dangan.png',
						title: '随访记录'
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
					'/pages/history/history', 
					'/pages/perInformation/perInformation', 
					'/pages/feedback/feedback', 
					'/pages/setup/setup'
				],
				avatar: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/1654c443-103e-4af8-aae0-a589137d8b5b.png',
				name: '默认用户名'
			};
		},
		onLoad() {
			if(store.state.userinfo.avatar && store.state.userinfo.name) {
				this.avatar = store.state.userinfo.avatar
				this.name = store.state.userinfo.name
			}
		},
    onShow() {
			if(store.state.userinfo.avatar && store.state.userinfo.name) {
				this.avatar = store.state.userinfo.avatar
				this.name = store.state.userinfo.name
			}
		},
		methods: {
			toLogin() {
				if(!store.state.userinfo.phone) {
					uni.reLaunch({
						url: '/pages/login/login'
					})
					return true
				}
			},
			setUp(index) {
				if(this.toLogin()) return;
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
		margin-top: 40rpx;
		margin-left: 38rpx;
		background-color: white;
		border-radius: 20rpx;
		box-shadow: -10rpx -10rpx 50rpx 5rpx rgba(0, 0, 0, 0.5);
	}
}
</style>
