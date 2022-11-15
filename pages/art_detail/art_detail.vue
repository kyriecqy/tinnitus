<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="title">
			{{ artDetail.title }}
		</view>
		<view class="info">
			<view class="author">{{ artDetail.author }}</view>
			<view class="time">
				<uni-dateformat :date="artDetail.time" format="yyyy/MM/dd" :threshold="[60000, 7200000]"></uni-dateformat>
			</view>
		</view>
		<view class="main">
			{{ artDetail.content }}
		</view>
		<view class="pic-list">
			<view class="item" v-for="(item, index) in artDetail.picList" :key="index">
				<image :src="item" mode="aspectFit"></image>
			</view>
		</view>
		<view class="btn">
			<uni-fab
				:pattern="pattern"
				horizontal="right"
				vertical="bottom"
				:content="content"
				@trigger="trigger"
			></uni-fab>
		</view>
		
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog 
			  mode="base" 
				title="提醒"
				content="请确定是否取消删除这篇文章"
				:duration="2000" 
				:before-close="true" 
				confirmText="确定"
				cancelText="取消"
				@close="close" 
				@confirm="confirm"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: '',
				artDetail: {},
				pattern: {
					buttonColor: '#F9921C',
					selectedColor: '#F9921C'
				},
				content: [
					{
						iconPath: '../../static/icon/delate.png',
						text: '删除',
						selectedIconPath: '../../static/icon/delate-yellow.png',
						active: false
					},
					{
						iconPath: '../../static/icon/remake.png',
						text: '修改',
						selectedIconPath: '../../static/icon/remake-yellow.png',
						active: false
					}
				]
			};
		},
		onLoad(e) {
			//console.log(e);
			this.id = e.id
			this.getDetail()
		},
		methods: {
			getDetail() {
				uniCloud.callFunction({
					name: "get_art_detail",
					data: {
						id: this.id
					}
				}).then(res => {
					//console.log('res',res);
					this.artDetail = res.result.data[0]
				})
			},
			trigger(e) {
				this.content[e.index].active = !e.item.active
				if(e.index == 0) {
					this.$refs.popup.open()		
				}else {
					uni.navigateTo({
						url:'/pages/art_edit/art_edit?artItem=' + encodeURIComponent(JSON.stringify(this.artDetail))
					})
				}
			},
			//确认删除文章
			confirm() {
				this.$refs.popup.close()
				
				uniCloud.callFunction({
					name: 'art_delate',
					data: {
						id: this.id
					}
				}).then(res => {
					uni.reLaunch({
						url: '/pages/community/community'
					})
				})
				
			},
			//不删除文章
			close() {
				this.$refs.popup.close()
				this.content[0].active = false
			}
		}
	}
</script>

<style lang="scss" scoped>
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
	.title {
		font-size: 45rpx;
		padding: 50rpx;
	}
	.info {
		padding: 0 50rpx 50rpx 50rpx;
		display: flex;
		font-size: 30rpx;
		.time {
			padding-left: 20rpx;
		}
	}
	.main {
		padding: 0 50rpx;
		font-size: 35rpx;
	}
	.pic-list {
		padding: 10rpx 0;
		.item {
			width: 90%;
			padding-left: 30rpx;
		}
	}
}
</style>
