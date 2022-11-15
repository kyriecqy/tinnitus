<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="top">
			<text>请从下面的12个声音中选择和您耳鸣最接近的声音</text>
		</view>
		<view class="main">
			<text>噪音</text>
			<view class="select-content">
				<view :class="['item', currentIndex == index ? 'selected' : '']" v-for="(item, index) in z_list" :key="index" @tap="select(index)">
					<image class="select-img" src="../../static/icon/d.png"></image>
				  <text>{{ index+1 }}号</text>
				</view>
			</view>
		</view>
		<view class="next" @tap="next">
			<u-button 
			  text="下一步" 
				color="linear-gradient(to right, #f9b95e, #F9921C)"
				shape="circle"
				size="large"
			></u-button>
		</view>
	</view>
</template>

<script>
	const innerAudioContext = uni.createInnerAudioContext();
	export default {
		data() {
			return {
				z_list: [
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/4d30a645-3c85-4ead-ad78-342a7a006729.mp3', level: 'low 125Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/5c46f4f1-3a99-4b0e-a8b5-64f1606de84d.mp3', level: 'low 250Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/e0ec96eb-fc37-4003-939c-d3c700f51a38.mp3', level: 'low 500Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/4666604b-ee55-4e05-b95b-425597ac0a8e.mp3', level: 'low 1000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/73e6c82a-2f92-4a98-9c25-f65679d35e30.mp3', level: 'mid 2000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/9f097d1b-0f93-4c41-a81d-e0494b85de33.mp3', level: 'mid 3000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/a9886cdb-fbf6-46dc-8310-7c4706d37faa.mp3', level: 'mid 4000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/56d7b494-4d4f-43d2-b40d-6faa5ce1afea.mp3', level: 'mid 5000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/e6c5b980-0388-444f-a360-d4f9abff0ca0.mp3', level: 'high 6000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/d1a2ccd3-4a03-4274-91a7-62a1a4857e19.mp3', level: 'high 8000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/845385f4-acec-4809-ae62-480629b2c22a.mp3', level: 'high 10000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/0b643b46-8adc-443c-8b12-538992ceb06a.mp3', level: 'high 12000Hz'}
				],
				isPlay: false,
				beforIndex: 0,
				music_select: '',
				currentIndex: -1
			}
		},
		onLoad(options) {
			let info = JSON.parse(decodeURIComponent(options.music_select))
			this.music_select = info
		},
		methods: {
			next() {
				innerAudioContext.stop()
				this.music_select.z_level = this.z_list[this.currentIndex].level
				let info = encodeURIComponent(JSON.stringify(this.music_select))
				uni.navigateTo({
					url: '/pages/diag-result/diag-result?music_select=' + info
				})
			},
			select(index) {
				if(this.isPlay == true) {
					innerAudioContext.stop()
					if(this.beforIndex == index) { //当前点击的和上一次播放的是同一个，表示要暂停
						innerAudioContext.stop()
						this.isPlay = false
						return;
					}
				}
				this.currentIndex = index //用于添加当前选择的样式
				innerAudioContext.loop = true
				innerAudioContext.src = this.z_list[index].url
				this.beforIndex = index
				innerAudioContext.play()
				this.isPlay = true
			}
		}
	}
</script>

<style scoped lang="scss">
.content {
	width: 100vw;
	height: 100vh;
	.img {
		opacity: 0.8;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
	}
	.top {
		width: 90%;
		margin-left: 35rpx;
		padding-top: 60rpx;
		text-align: center;
		text {
			font-size: 45rpx;
		}
	}
	.main {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 1200rpx;
		border-top-left-radius: 70rpx;
		border-top-right-radius: 70rpx;
		background-color: #eee;
		box-shadow: 0 0 50rpx 2rpx rgba(0, 0, 0, 0.5);
		text-align: center;
		overflow: hidden;
		text {
			font-size: 50rpx;
			position: relative;
			font-weight: 600;
			top: 20rpx;
		}
		.select-content {
			width: 90%;
			height: 700rpx;
			margin-left: 35rpx;
			margin-top: 30rpx;
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			.item {
				position: relative;
				top: 30rpx;
				margin-bottom: 25rpx;
				width: 200rpx;
				height: 170rpx;
				border-radius: 30rpx;
				text-align: center;
				background-color: #f9f9f9;
				box-shadow: 0 0 20rpx 2rpx rgba(0, 0, 0, 0.5);
				overflow: hidden;
				display: flex;
				flex-direction: column;
				text {
					font-size: 55rpx;
					margin-top: -15rpx;
				}
				.select-img {
					width: 50rpx;
					height: 50rpx;
					padding-top: 25rpx;
					margin-left: 75rpx;
				}
			}
			.selected {
				background-color: #F9921C;
			}
		}
	}
	
	.next {
		width: 500rpx;
		position: fixed;
		bottom: 100rpx;
		left: 125rpx;
	}
}
</style>

