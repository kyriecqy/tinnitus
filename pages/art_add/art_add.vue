<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<form class="form">
			<view class="title item">
				<text>文章标题：</text>
				<input type="text" placeholder="请输入文章标题" v-model="artItem.title">
			</view>
			<view class="main item">
				<text>文章内容：</text>
				<textarea name="content" v-model="artItem.content" id="" cols="30" rows="10" placeholder="请输入文章内容"></textarea>
			</view>
			<text class="upload-text">添加图片：</text>
			<view class="upload">
				<uni-file-picker 
					fileMediatype="image" 
					:auto-upload="false"
					mode="grid" 
					ref="files"
					:image-styles="imageStyle"
					@success="success" 
					@fail="fail" 
				/>
			</view>
			
			<view class="btn">
				<view class="back" @tap="back">
					<button>返回</button>
				</view>
				<view class="next" @tap="submit">
					<button>确认</button>
				</view>
			</view>
		</form>
		<uni-popup ref="popup" type="center">
			<uni-popup-dialog 
			  mode="base" 
				title="提醒"
				content="请确定是否取消编辑，若取消编辑将不保存已编辑的内容！"
				:duration="2000" 
				:before-close="true" 
				confirmText="是"
				cancelText="否"
				@close="close" 
				@confirm="confirm"
			></uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="popupSubmit" type="center">
			<uni-popup-dialog 
			  mode="base" 
				title="提醒"
				content="请确认是否提交文章"
				:duration="2000" 
				:before-close="true" 
				confirmText="是"
				cancelText="否"
				@close="closeSubmit" 
				@confirm="confirmSubmit"
			></uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				artItem: {
					title: '',
					content: '',
					time: 0,
					author: 'KyrieC',
					picList: []
				},
				filesUrl: [],
				imageStyle: {
					"height": 80,	// 边框高度
					"width": 80,	// 边框宽度
					"border":{ // 如果为 Boolean 值，可以控制边框显示与否
						"color":"#bebebe",		// 边框颜色
						"width":"1px",		// 边框宽度
						"style":"solid", 	// 边框样式
					}
				}
			}
		},
		methods: {
			back() {
				this.$refs.popup.open()
			},
			//提交文章
			submit() {
				this.$refs.popupSubmit.open()
			},
			//确认取消编辑
			confirm() {
				this.$refs.popup.close()
				uni.reLaunch({
					url: '/pages/community/community'
				})
			},
			//不取消编辑
			close() {
				this.$refs.popup.close()
			},
			//确认提交编辑
			confirmSubmit() {
				this.$refs.popupSubmit.close()
				this.upload()
				
			},
			//取消提交编辑
			closeSubmit() {
				this.$refs.popupSubmit.close()
			},
			//图片上传
			upload() {
				this.$refs.files.upload()
			},
			// 上传成功
			success(e){
				console.log('上传成功: ', e)
				this.filesUrl = e.tempFilePaths
				
				let time = Date.now()
				this.artItem.time = time
				this.artItem.picList = e.tempFilePaths
				if(this.artItem.title == '' || this.artItem.content == '') {
					uni.showToast({
						title: '文章标题或内容为空！',
						icon:'none'
					})
					return;
				}
				uniCloud.callFunction({
					name: 'add_art',
					data: {
						artItem: this.artItem
					}
				}).then(res => {
					uni.reLaunch({
						url: '/pages/community/community'
					})
				})
				
			},
			
			// 上传失败
			fail(e){
				console.log('上传失败：',e)
			}
		}
	}
</script>

<style scoped lang="scss">
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
	.form {
		height: 100%;
		width: 100%;
		.item {
			padding-top: 30rpx;
			padding-bottom: 20rpx;
			padding-left: 30rpx;
			font-size: 35rpx;
		}
		.title {
			display: flex;
			input {
				border-bottom: 1px solid #c2c2c2;
				height: 60rpx;
				padding: 0 20rpx;
				width: 450rpx;
			}
		}
		.main {
			textarea {
				margin-top: 20rpx;
				border: 1px solid #c2c2c2;
				width: 670rpx;
				height: 400rpx;
			}
		}
	}
}
.btn {
	display: flex;
	width: 100%;
	justify-content: space-around;
	position: fixed;
	bottom: 8%;
}
.back button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	margin-top: 130rpx;
}
.next button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	margin-top: 130rpx;
}
.upload-text {
	font-size: 35rpx;
	padding-left: 33rpx;
}
.upload {
	padding: 20rpx 45rpx 0 34rpx;
}
</style>
