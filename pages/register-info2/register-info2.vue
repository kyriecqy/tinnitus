<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="title">
		  身体状况
		</view>
		<view class="msg">
			患有哪些疾病? 可以选择多个
		</view>
		<view class="main">
			<view :class="['item-gxy', this.isSelectList[0] ? 'select' : '']" data-disease="0" @tap="selectDis">
				高血压
			</view>
			<view :class="['item-tnb', this,isSelectList[1] ? 'select' : '']" data-disease="1" @tap="selectDis">
				糖尿病
			</view>
			<view :class="['item-gxb', this.isSelectList[2] ? 'select' : '']" data-disease="2" @tap="selectDis">
				冠心病
			</view>
			<view :class="['item-xxgb', this.isSelectList[3] ? 'select' : '']" data-disease="3" @tap="selectDis">
				心血管病
			</view>
		</view>
	  <view class="btn">
	  	<view class="back" @tap="back">
	  		<button>返回</button>
	  	</view>
	  	<view class="next" @tap="next">
	  		<button>确认</button>
	  	</view>
	  </view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
	export default {
		data() {
			return {
				diseaseList: [],
				isSelectList: [false, false, false, false],
				userinfo: {}
			}
		},
		onLoad(options) {
			let info = JSON.parse(decodeURIComponent(options.userinfo))
			this.userinfo = info
		},
		methods: {
			selectDis(e) {
				let val = e.target.dataset.disease
				let len = this.diseaseList.length
				for (let i = 0; i < len; i++) {
					if(val === this.diseaseList[i]) {
						this.diseaseList.pop(this.diseaseList[i])
						this.isSelectList[val] = false
						return;
					}
				}
				this.diseaseList.push(val)
				this.isSelectList[val] = true
			},
			next() {
				//console.log('disease', this.diseaseList);
				let disease = []
				this.diseaseList.forEach(item => {
					switch (item){
						case '0':
						  disease.push('高血压')
							break;
						case '1':
						  disease.push('糖尿病')
							break;
						case '2':
							disease.push('冠心病')
							break;
						case '3':
							disease.push('心血管病')
							break;
					}
				})
				this.userinfo.diseaseList = disease
				this.userinfo.avatar = this.userinfo.gender == '男' ? 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/1654c443-103e-4af8-aae0-a589137d8b5b.png'
				                                                     : 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/a807c384-c808-42a7-9a8f-ff8f10b6b108.png'
				console.log('new', this.userinfo);
				this.userinfo.time = Date.now()
				store.dispatch('setUser', this.userinfo)
				uniCloud.callFunction({
					name: 'update_user',
					data: this.userinfo
				}).then(res => {
					uni.switchTab({
						url: '/pages/index/index'
					})
				})
				
			},
			back() {
				uni.navigateBack({
					delta: 1
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
	padding-top: 150rpx;
	font-weight: 900;
}
.msg {
	font-size: 45rpx;
	padding-left: 90rpx;
	margin-top: 30rpx;
}
.main {
	margin-left: 92rpx;
	margin-top: 30rpx;
	width: 560rpx;
	height: 700rpx;
}
.item-gxy {
	width: 200rpx;
	height: 200rpx;
	background-color: #fff;
	border-radius: 90%;
	text-align: center;
	line-height: 200rpx;
	font-size: 45rpx;
	border: 2px solid #9f9f9f;
	position: relative;
	top: 10%;
	left: 30%;
}
.item-tnb {
	width: 180rpx;
	height: 180rpx;
	background-color: #fff;
	border-radius: 90%;
	text-align: center;
	line-height: 180rpx;
	font-size: 45rpx;
	border: 2px solid #9f9f9f;
	position: relative;
	top: 15%;
	left: 60%;
}
.item-gxb {
	width: 160rpx;
	height: 160rpx;
	background-color: #fff;
	border-radius: 90%;
	text-align: center;
	line-height: 160rpx;
	font-size: 45rpx;
	border: 2px solid #9f9f9f;
	position: relative;
	top: -15%;
	left: 10%;
}
.item-xxgb {
	width: 200rpx;
	height: 200rpx;
	background-color: #fff;
	border-radius: 90%;
	text-align: center;
	line-height: 200rpx;
	font-size: 45rpx;
	border: 2px solid #9f9f9f;
	position: relative;
	top: -10%;
	left: 20%;
}
.select {
	background-color: #F9921C;
}
.btn {
	display: flex;
	width: 100%;
	justify-content: space-around;
}
.back button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	margin-top: 200rpx;
}
.next button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
	margin-top: 200rpx;
}
</style>
