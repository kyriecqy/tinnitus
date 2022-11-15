<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="top">
			<text>请从下面的12个声音中选择和您耳鸣最接近的声音</text>
		</view>
		<view class="main">
			<text>纯音</text>
			<view class="select-content">
				<view :class="['item', currentIndex == index ? 'selected' : '']" v-for="(item, index) in c_list" :key="index" @tap="select(index)">
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
				c_list: [
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/778ca488-69b5-4ec4-a766-fbb8ee56f600.mp3', level: 'low 125Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/373920fc-c107-496e-aac8-97592a05a1af.mp3', level: 'low 250Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/f32ff20d-f2b3-48ec-a2b1-ddadc7facdf9.mp3', level: 'low 500Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/dea22ab6-3056-4bf5-a5a8-452713e24976.mp3', level: 'low 1000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/0d29d8dc-0d82-41cd-9343-c026d4c152f1.mp3', level: 'mid 2000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/8181c631-4c2f-4b6b-a61e-d83df446dffd.mp3', level: 'mid 3000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/21b4007d-bc0b-4e03-9581-3a0563009177.mp3', level: 'mid 4000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/30c74b8e-a4d3-47e2-951f-992e8faa20ea.mp3', level: 'mid 5000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/01e42792-b00b-4aae-afcf-ce4c27d673ab.mp3', level: 'high 6000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/9e680a92-02f9-4f65-8b1e-0671b95eaa96.mp3', level: 'high 8000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/222e005d-77e9-4812-9db6-2a0d65b73f52.mp3', level: 'high 10000Hz'},
					{url: 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/15eeafbb-0a4d-41e3-80e8-72635d6cb2c7.mp3', level: 'high 12000Hz'}
				],
				isPlay: false,
				beforIndex: 0,
				music_select: {
					c_level: '',
					z_level: '',
					place: ''
				},
				currentIndex: -1
			}
		},
		onLoad(options) {
			let info = JSON.parse(decodeURIComponent(options.music_select))
			this.music_select = info
			//console.log(this.music_select);
		},
		methods: {
			next() {
				innerAudioContext.stop()
				this.music_select.c_level = this.c_list[this.currentIndex].level
				let info = encodeURIComponent(JSON.stringify(this.music_select))
				uni.navigateTo({
					url: '/pages/diagnosis2/diagnosis2?music_select=' + info
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
				innerAudioContext.src = this.c_list[index].url
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
