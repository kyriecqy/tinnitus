<template>
	<view class="content">
		<view class="main">
			<view class="avatar">
				<view class="avatar-item">
					<image :src="avatar" mode=""></image>
				</view>
				<view class="right" @tap="selectImg">
					<text>修改头像</text>
					<image src="../../static/icon/yjt.png"></image>
				</view>
			</view>
			<view class="item" v-for="(item, index) in itemList" :key="index" @tap="open">
				<view class="left">
					<text>{{ item.title }}</text>
				</view>
				<view class="right">
					<text>{{ item.content }}</text>
				</view>
			</view>
		</view>
		
		<u-popup :show="show" mode="center" round="20" @close="close" @open="open" :closeOnClickOverlay="isCloseOnClickOverlay" >
			<view class="popup">
				<view class="name">
					<text>用户名：</text>
					<u--input
						placeholder="请输入内容"
						border="none"
						v-model="info_update.name"
						clearable
					></u--input>
				</view>
				<view class="gender">
					<text>性别：</text>
					<u-radio-group
						v-model="info_update.gender"
						placement="row"
					>
						<u-radio
						  :customStyle="{marginLeft: '18px'}"
							v-for="(item, index) in gender_list"
							:key="index"
							size="25"
							labelSize="25"
							iconSize="25"
							:label="item.name"
							:name="item.name"
							@change="radioChange"
						>
						</u-radio>
					</u-radio-group>
				</view>
				<view class="birth">
					<text>出生日期：</text>
					<picker mode="date" :value="info_update.birth" @change="bindDateChange" fields="year">
						<view class="uni-input">{{info_update.birth}}</view>
						<image class="birth_img" src="../../static/icon/xjt1.png" mode=""></image>
					</picker>
				</view>
				<view class="btn">
					<view class="back" @tap="cancel">
						<button>取消</button>
					</view>
					<view class="next" @tap="submit">
						<button>修改</button>
					</view>
				</view>
			</view>
		</u-popup>
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
				userinfo: {},
				avatar: '',
				show: false,
				show_birth: false,
				isCloseOnClickOverlay: false,//点击遮罩层无法关闭弹窗
				gender_list: [
					{
						name: '男'
					},
					{
						name: '女'
					}
				],
				info_update: {
					gender: '',
					birth: '',
					name: ''
				},
				tempFilePath: ''
			}
		},
		onLoad() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.userinfo = store.state.userinfo
				this.itemList[0].content = this.userinfo.name
				this.itemList[1].content = this.userinfo.phone
				this.itemList[2].content = this.userinfo.gender
				this.itemList[3].content = this.userinfo.birth
				this.avatar = this.userinfo.avatar
				
				//初始化用于更新的用户信息
				this.info_update.name = this.userinfo.name
				this.info_update.gender = this.itemList[2].content
				this.info_update.birth = this.userinfo.birth
			},
			//保存并返回
			save() {
				uni.switchTab({
					url: '/pages/mine/mine'
				})
			},
			//打开修改弹窗
			open() {
				this.show = true
			},
			//关闭修改弹窗
			close() {
				this.show = false
			},
			radioChange(n) {
				this.info_update.gender = n
			},
			bindDateChange(e) {
				this.info_update.birth = e.target.value
			},
			//提交修改
			submit() {
				this.info_update.id = store.state.userinfo.id
				uniCloud.callFunction({ //更新用户信息
					name: 'update_user',
					data: this.info_update
				}).then(() => {
					uniCloud.callFunction({ //获取更新后的用户信息
						name: 'get_info_by_phone',
						data: {
							phone: store.state.userinfo.phone
						}
					}).then(res => {
						let info = {
							id: res.result.data._id,
							phone: res.result.data.phone,
							gender: res.result.data.gender,
							birth: res.result.data.birth,
							diseaseList: res.result.data.diseaseList,
							avatar: res.result.data.avatar,
							name: res.result.data.name
						}
						store.dispatch('setUser', info) //更新Vuex中的数据
						this.getInfo() //重新渲染数据
						this.close()
					})
				})
			},
			cancel() {
				this.close()
			},
			uploadImg() {
				let arr = this.tempFilePath.split('.')
				let len = arr.length
				let cPath = Date.now() + '.' + arr[len-1]
				uniCloud.uploadFile({
					cloudPath: cPath,
					filePath: this.tempFilePath
				}).then(res => {
					this.avatar = res.fileID
					this.updateAvatar()
				}).catch(err => {
					console.log(err);
				})
			},
			//修改头像
			selectImg() {
				uni.chooseImage({
					count: 1, //上传数量
					sizeType: 'compressed', //压缩图
					sourceType: ['album'], //从相册选取
					success: res => {
						this.tempFilePath = res.tempFilePaths[0]
						this.uploadImg()
					}
				})
			},
			updateAvatar() {
				let info = {}
				info.id = store.state.userinfo.id
				info.avatar = this.avatar
				uniCloud.callFunction({
					name: 'update_user',
					data: info
				}).then(() => {
					uniCloud.callFunction({ //获取更新后的用户信息
						name: 'get_info_by_phone',
						data: {
							phone: store.state.userinfo.phone
						}
					}).then(res => {
						let uInfo = {
							id: res.result.data._id,
							phone: res.result.data.phone,
							gender: res.result.data.gender,
							birth: res.result.data.birth,
							diseaseList: res.result.data.diseaseList,
							avatar: res.result.data.avatar,
							name: res.result.data.name
						}
						store.dispatch('setUser', uInfo) //更新Vuex中的数据
						this.getInfo() //重新渲染数据
						this.close()
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
@import "@/uni_modules/uview-ui/index.scss";
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
	.popup {
		width: 600rpx;
		height: 700rpx;
		.name {
			display: flex;
			margin-bottom: 10rpx;
			border-bottom: 1px solid #eee;
			margin: 30rpx 40rpx 0 30rpx;
			height: 100rpx;
			text {
				font-size: 50rpx;
				margin-top: 15rpx;
			}
		}
		.gender {
			display: flex;
			margin-bottom: 10rpx;
			border-bottom: 1px solid #eee;
			margin: 30rpx 40rpx 0 30rpx;
			height: 100rpx;
			text {
				font-size: 50rpx;
				margin-top: 15rpx;
			}
		}
		.birth {
			display: flex;
			margin-bottom: 10rpx;
			border-bottom: 1px solid #eee;
			margin: 30rpx 40rpx 0 30rpx;
			height: 100rpx;
			text {
				font-size: 50rpx;
				margin-top: 15rpx;
			}
			.birth_img {
				width: 40rpx;
				height: 50rpx;
				z-index: 1000;
				position: fixed;
				top: 48%;
				right: 22%;
			}
			.uni-input {
				font-size: 50rpx;
				margin-top: 15rpx;
				margin-left: 30rpx;
			}
		}
		.btn {
			display: flex;
			width: 100%;
			justify-content: space-around;
		}
		.back button {
			font-size: 40rpx;
			width: 250rpx;
			background-color: #F9921C;
			border-radius: 90rpx;
			border: 1px solid white;
			box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
			margin-top: 100rpx;
		}
		.next button {
			font-size: 40rpx;
			width: 250rpx;
			background-color: #F9921C;
			border-radius: 90rpx;
			border: 1px solid white;
			box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
			margin-top: 100rpx;
		}
	}
}

</style>
