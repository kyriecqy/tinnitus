<template>
	<view class="content">
		<view class="item">
			<view class="pic">
				<image :src="detail.picList[0]" mode=""></image>
			</view>
			<view class="text">
				<view class="title">{{detail.title}}</view>
				<view class="info">
					<text>{{detail.author}}</text>
					<view>
						<uni-dateformat :date="detail.time" format="yyyy/MM/dd" :threshold="[60000, 7200000]"></uni-dateformat>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		name:"ArtItem",
		props: ['detail'],
		data() {
			return {
				
			};
		},
		 onLoad() {
		 	console.log('detail:', this.detail);
		 }
	}
</script>

<style lang="scss" scoped>
.content {
	.item {
		display: flex;
		padding: 20rpx 50rpx;
		border-bottom: 1rpx solid #eee;
		.text {
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			padding-left: 50rpx;
			.title {
				font-size: 45rpx;
				color: #333;
				text-overflow: -o-ellipsis-lastline;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-line-clamp: 2;
				line-clamp: 2;
				-webkit-box-orient: vertical;
			}
			.info {
				font-size: 35rpx;
				color: #888;
				display: flex;
				text {
					padding-right: 20rpx;
				}
			}
		}
		.pic {
			width: 260rpx;
			height: 180rpx;
			image {
				width: 100%;
				height: 100%;
			}
		}
	}
}
</style>