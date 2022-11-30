<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<uni-load-more status="loading" v-if="isLoad"></uni-load-more>
		<view class="main" v-else>
			<view class="top-title">
				<text>科普</text>
			</view>
			
			<scroll-view scroll-y="true" :show-scrollbar="false">
				<view @tap="goDetail(item._id)" v-for="(item, index) in artList" :key="index" >
					<ArtItem :detail="item"></ArtItem>
				</view>
			</scroll-view>
			<!-- 悬浮按钮
			<view class="btn">
				<uni-fab
					:pattern="pattern"
					horizontal="right"
					vertical="bottom"
					@fabClick="add"
				></uni-fab>
			</view>
			-->
		</view>
	</view>
</template>

<script>
	import ArtItem from "../../components/ArtItem/ArtItem.vue"
	export default {
		data() {
			return {
				artList: [],
				isLoad: true,
				pattern: {
					buttonColor: '#F9921C'
				}
			}
		},
		components: {
			ArtItem
		},
		onLoad() {
      this.getAllArt()
		},
		// 触底加载数据
		onReachBottom() {
			this.getAllArt()
		},
		methods: {
			getAllArt() {
				uniCloud.callFunction({
					name: 'get_all_art',
					data: {
						skip: this.artList.length
					}
				}).then(res => {
					//console.log(res);
					this.artList = [...this.artList, ...res.result.data]
					this.isLoad = false
					//console.log(this.artList);
				})
			},
      goDetail(e) {
				//console.log('e:',e);
				uni.navigateTo({
					url: "/pages/art_detail/art_detail?id=" + e
				})
			},
			//新增文章
			add() {
				uni.navigateTo({
					url: '/pages/art_add/art_add'
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
			z-index: -1;
		}
		.main {
			.top-title {
				font-weight: 900;
				font-size: 45rpx;
				color: #0d0c0c;
				padding-top: 50rpx;
				padding-left: 50rpx;
			}
			.art_list {
			}
		}
	}
</style>
