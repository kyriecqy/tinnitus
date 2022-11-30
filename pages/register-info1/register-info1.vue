<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="title">
      个人信息
		</view>
		<view class="sex">
			<text>性别:</text>
			<uni-data-checkbox 
			  style="width: 400rpx;"
			  v-model="sexValue" 
				:localdata="sex" 
				mode="tag"
				selectedColor="#F9921C"
			></uni-data-checkbox>
		</view>
		<view class="birth">
			<text>出生年份:</text>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="bindDateChange" fields="year">
				<view class="uni-input">{{date}}</view>
				<image src="../../static/icon/xjt1.png" mode=""></image>
			</picker>
		</view>
		<view class="next" @tap="next">
			<button>下一步</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				value1: '',
				sexValue: 0,
				sex: [
					{
						text: '男',
						value: 0
					},
					{
						text: '女',
						value: 1
					}
				],
				startDate: '1920',
				endDate: '2022',
				date: '1920',
				userinfo: {
					id: '',
					gender: '',
				  birth: ''
				}
			}
		},
		onLoad(options) {
			let info = JSON.parse(decodeURIComponent(options.userinfo))
			console.log('r1', info);
			this.userinfo.id = info.data
			this.userinfo.phone = info.phone
			this.userinfo.name = "默认用户名"
			this.userinfo.avatar = ''
		},
		methods: {
			bindDateChange(e) {
				this.date = e.target.value
			},
			next() {
				this.userinfo.gender = this.sexValue == 0 ? '男' : '女'
				this.userinfo.birth = this.date
				let info = JSON.stringify(this.userinfo)
				uni.navigateTo({
					url: '/pages/register-info2/register-info2?userinfo=' + encodeURIComponent(info)
				})
			}
		}
	}
</script>

<style scoped>
.content {
	width: 100vw;
	height: 100vh;
	
}
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
	padding-left: 270rpx;
	font-size: 50rpx;
	padding-top: 120rpx;
	font-weight: 900;
}
.sex, .birth {
	display: flex;
	margin-top: 200rpx;
	margin-left: 130rpx;
}
.sex text {
	font-size: 45rpx;
	padding-top: 20rpx;
	padding-right: 80rpx;
}
>>> uni-label.checklist-box.uni-label-pointer.is--tag {
	width: 100rpx;
	height: 80rpx;
}
>>> uni-text.checklist-text span {
	font-size: 50rpx;
	padding-left: 25rpx;
}
>>> .uni-picker-view-content .uni-picker-item {
	font-size: 60rpx;
}
.birth {
	margin-top: 150rpx;
}
.birth text {
	font-size: 45rpx;
	padding-top: 20rpx;
	padding-right: 80rpx;
}
.birth image {
	width: 40rpx;
	height: 50rpx;
	z-index: 1000;
	position: fixed;
	top: 42.5%;
	right: 22%;
}
.uni-input {
	font-size: 50rpx;
	margin-top: 15rpx;
}
.next button {
	font-size: 40rpx;
	width: 500rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	margin-top: 500rpx;
}
</style>
