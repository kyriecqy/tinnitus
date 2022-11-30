<template>
	<view class="content">
		<image class="img" src="../../static/img/bg.webp" mode=""></image>
		<view class="main">
			<text>耳鸣部位</text>
			<view class="item">
				<view :class="['item1', 'gy', music_select.place == '左耳' ? 'selected' : '']" data-place="左耳" @tap="select">左耳</view>
				<view :class="['item2', 'gy', music_select.place == '右耳' ? 'selected' : '']" data-place="右耳" @tap="select">右耳</view>
				<view :class="['gy', music_select.place == '双耳' ? 'selected' : '']" data-place="双耳" @tap="select">双耳</view>
				<view :class="['gy', music_select.place == '脑鸣' ? 'selected' : '']" data-place="脑鸣" @tap="select">脑鸣</view>
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
	const audioHelper = uni.requireNativePlugin('L-GetDecibel')
	export default {
		data() {
			return {
				music_select: {
					c_level: '',
					z_level: '',
					place: ''
				}
			}
		},
		onLoad() {
			//this.begin()
			//setTimeout(() => {
			//	this.stop()
			//}, 2000)
			innerAudioContext.loop = true
			innerAudioContext.src = 'https://vkceyugu.cdn.bspapp.com/VKCEYUGU-57427bc9-5796-4e91-8bbb-72a81e0943f3/e73685f3-868a-423a-a38c-ab30d119e793.mp3'
			innerAudioContext.play()
		},
		methods: {
			begin() {
				audioHelper.getDecibel({ intervalTime: 1000 }, res => {
					console.log(res);
					let db = res.db
					if(db > 50) this.show_db()
				})
			},
			show_db() {
				uni.showToast({
					title: '当前环境较嘈杂，建议在环境安静时检测！',
					icon: 'none',
					duration: 2000
				})
			},
			stop() {
				audioHelper.stop()
			},
			next() {
				if(this.music_select.place == '') {
					uni.showToast({
						position: 'center',
						title: '请选择其中一项'
					})
					return;
				}
				let info = encodeURIComponent(JSON.stringify(this.music_select))
				uni.navigateTo({
					url: '/pages/diagnosis1/diagnosis1?music_select=' + info
				})
			},
			select(e) {
				this.music_select.place = e.target.dataset.place
				innerAudioContext.stop()
				innerAudioContext.destroy()
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
	.main {
		width: 90%;
		height: 700rpx;
		margin-left: 35rpx;
		position: relative;
		top: 12%;
		text {
			position: relative;
			top: 50rpx;
			margin-left: 250rpx;
			font-size: 50rpx;
		}
		.item {
			width: 100%;
			height: 500rpx;
			background-color: #fff;
			border-radius: 30rpx;
			margin-top: 80rpx;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			.gy {
				text-align: center;
				line-height: 160rpx;
				font-size: 45rpx;
				width: 280rpx;
				height: 160rpx;
				background-color: #eee;
				border-radius: 30rpx;
			}
			.item1 {
				margin-top: 55rpx;
			} 
			.item2 {
				margin-top: 55rpx;
			}
			.selected {
				background-color: #F9921C;
			}
		}
	}
	.next {
		width: 500rpx;
		position: fixed;
		bottom: 200rpx;
		height: 200rpx;
		left: 125rpx;
	}
}
</style>
