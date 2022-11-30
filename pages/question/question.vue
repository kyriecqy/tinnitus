<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="que-item" v-for="(item, index) in showQue" :key="index">
			<view class="title">
				{{ currentIndex+1 }}.{{ item.title }}
			</view>
			<view :class="['select-item', 'item1', queList[currentIndex].selectIndex == 0 ? 'active' : '']" data-selec="0" @tap="selecAns"></view>
			<view :class="['select-item', 'item2', queList[currentIndex].selectIndex == 1 ? 'active' : '']" data-selec="1" @tap="selecAns"></view>
			<view :class="['select-item', 'item3', queList[currentIndex].selectIndex == 2 ? 'active' : '']" data-selec="2" @tap="selecAns"></view>
			<view :class="['select-item', 'item4', queList[currentIndex].selectIndex == 3 ? 'active' : '']" data-selec="3" @tap="selecAns"></view>
			<view class="btn">
				<view class="back" @tap="back" v-if="currentIndex != 0">
					<button>上一页</button>
				</view>
				<view class="next" @tap="next">
					<button>下一页</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js';
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				queList: [
					{
						title: '耳鸣部位是哪里?',
						selectIndex: ''
					},
					{
						title: '您在什么环境下可听到耳鸣?',
						selectIndex: ''
					},
					{
						title: '您的耳鸣是间歇性还是持续性?',
						selectIndex: ''
					},
					{
						title: '耳鸣影响了您的睡眠吗?',
						selectIndex: ''
					},
					{
						title: '耳鸣影响了您的生活吗?',
						selectIndex: ''
					},
					{
						title: '耳鸣影响了您的情绪吗?',
						selectIndex: ''
					},
					{
						title: '您认为自己的耳鸣有多严重?',
						selectIndex: ''
					}
				],
			  currentIndex: 0,
				music_list: [
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/e73685f3-868a-423a-a38c-ab30d119e793.mp3',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/9a5d579c-4834-4979-afca-a700489fc3c6.mp3',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/e2a3d3a5-0ec1-4279-8eb5-a0c965c85409.mp3',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/63e943a0-e31d-4364-8fca-7a1d809841e8.mp3',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/e770b3dd-307d-48e4-9143-1631e9bfb2ff.mp3',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/a807745d-a478-4d48-81e1-1496ce654164.mp3',
					'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/2d2b0b6e-211e-4335-a3de-c310be49411c.mp3'
				]
			}
		},
		onLoad() {
			innerAudioContext.loop = true
			innerAudioContext.src = this.music_list[this.currentIndex]
			innerAudioContext.play()
		},
		computed: {
			showQue: function() {
				return this.queList.filter((value, index) => {
					
					return index === this.currentIndex
				})
			},
			queResult: function() {
				let res = 0
				this.queList.forEach((item, index) => {
					 if(index != 0) { //取出第一个问题的分数，第一个问题不记录分数
						 res += parseInt(item.selectIndex)
					 }
				})
				return res
			}
		},
		methods: {
			
			back() {
				if(this.currentIndex > 0) {
					this.currentIndex -= 1
					innerAudioContext.src = this.music_list[this.currentIndex]
					innerAudioContext.play()
				}
			},
			next() {
				if(this.currentIndex < this.queList.length-1) {
					if(this.queList[this.currentIndex].selectIndex != '') {
						this.currentIndex += 1
						innerAudioContext.src = this.music_list[this.currentIndex]
						innerAudioContext.play()
						return;
					}else {
						
						uni.showToast({
							position: 'center',
							title: '请选择其中一项'
						})
						return;
					}
				}
				//console.log(this.queResult);
				innerAudioContext.stop()
				innerAudioContext.destroy()
				let obj = {
					score: this.queResult,
					phone: store.state.userinfo.phone,
					time: Date.now()
				}
				uniCloud.callFunction({
					name: 'add_queHistory',
					data: obj
				}).catch(err => {
					console.log(err);
				})
				uni.navigateTo({
					url: '/pages/que-result/que-result?queResult=' + JSON.stringify(this.queResult)
				})
			},
			selecAns(e) {
				let val = e.target.dataset.selec
				this.queList[this.currentIndex].selectIndex = val
				//console.log(this.queList);
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
	.que-item {
		width: 100%;
		height: 100%;
		.title {
			font-size: 45rpx;
			padding-left: 50rpx;
			padding-top: 50rpx;
		}
		.select-item {
			width: 200rpx;
			height: 200rpx;
			border-radius: 40rpx;
			position: fixed;
		}
		.item1 {
			background-color: skyblue;
			top: 20%;
			left: 16%;
		}
		.item2 {
			background-color: #ff2010;
			top: 20%;
			left: 59%;
		}
		.item3 {
			background-color: orange;
			top: 45%;
			left: 16%;
		}
		.item4 {
			background-color: green;
			top: 45%;
			left: 59%;
		}
		.active {
			border: 1px solid rgba(0, 0, 0, 0.5);
			box-shadow: 0 0 20rpx 20rpx rgba(0, 0, 0, 0.5);
		}
	}
}
.btn {
	display: flex;
	width: 100%;
	justify-content: space-around;
	position: fixed;
	bottom: 10%;
}
.back button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
}
.next button {
	font-size: 40rpx;
	width: 300rpx;
	background-color: #F9921C;
	border-radius: 90rpx;
	border: 1px solid white;
	box-shadow: -5rpx -5rpx 50rpx 2rpx rgba(0, 0, 0, 0.5);
}
</style>
