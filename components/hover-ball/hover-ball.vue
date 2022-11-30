<template>
	<view
		class="hover_ball_cell"
		:style="{ width: `${diameter}px`, height: `${diameter}px`, top: `${top}px`, left: `${left}px` }"
		@touchmove="touchmove"
		@touchend="touchend"
		@touchcancel="touchcancel"
		@touchstart="onTap"
		@tap="open"
		:animation="ballAnimation"
	>
		<view class="wave">
		</view>
	</view>
</template>

<script>
	import store from '../../store/index.js'
export default {
	data() {
		return {
			diameter: 0,
			top: 0,
			left: 0,
			isMove: false,
			ballAnimation: {},
			timeout: null,
			modile: {},
		};
	},
	name: 'hover-ball',
	created() {
		let _this = this;
		_this.modile = uni.getSystemInfoSync();
		_this.top = _this.modile.safeArea.top + 300;
		_this.left = _this.modile.safeArea.width;
		_this.diameter = _this.modile.screenHeight / 15;
	},
	methods: {
		onTap() {
			let _this = this;
			let x = '0';
			if (2 * _this.left >= _this.modile.safeArea.width) {
				x = '-100%';
			}
			let create = uni.createAnimation({
				duration: 0
			});
			create.translate(x).step();
			_this.ballAnimation = create.export();
			_this.overBall();
		},
		touchmove(e) {
			let _this = this;
			_this.isMove = true;
			if (_this.timeout != null) {
				clearTimeout(_this.timeout);
				_this.timeout = null;
			}
			var touch = e.touches[0] || e.changedTouches[0];
			_this.left = touch.clientX;
			_this.top = touch.clientY;
		},
		touchend(e) {
			let _this = this;
			if (!_this.isMove) {
				return;
			}
			_this.finish(e);
		},
		touchcancel(e) {
			let _this = this;
			if (!_this.isMove) {
				return;
			}
			_this.finish(e);
		},
		finish(e) {
			let _this = this;
			_this.isMove = false;
			var touch = e.touches[0] || e.changedTouches[0];
			_this.left = touch.clientX;
			_this.top = touch.clientY;
			let x = '0';
			if (2 * _this.left + _this.diameter >= _this.modile.safeArea.width) {
				_this.left = _this.modile.safeArea.width;
				x = '-100%';
			} else {
				_this.left = _this.modile.safeArea.left;
			}
			if (_this.top > _this.modile.safeArea.height + _this.modile.safeAreaInsets.bottom) {
				_this.top = _this.modile.safeArea.height + _this.modile.safeAreaInsets.bottom; 
			} else if (_this.top < - _this.diameter / 2) {
				_this.top = - _this.diameter / 2;
			}
			let create = uni.createAnimation({
				duration: 0
			});
			create.translate(x).step();
			_this.ballAnimation = create.export();
			_this.overBall();
		},
		overBall() {
			let _this = this;
			_this.timeout = setTimeout(() => {
				_this.timeout = null;
				let create = uni.createAnimation({
					duration: 400,
					timingFunction: 'ease-in'
				});
				create.translate('-50%').step();
				_this.ballAnimation = create.export();
			}, 1200);
		},
		
		//自己的方法
		open() {
			console.log(store.state.musicinfo);
			/*
			uni.navigateTo({
				url: '/pages/music-detail/music-detail'
			})
			*/
		}
	}
};
</script>

<style lang="less" scoped>
.hover_ball_cell {
	position: fixed;
	overflow: hidden;
	border-radius: 50%;
	border: 4upx solid #F9921C;
	background: #ffffff;
	transform: translate(-50%, 0);
	padding: 4upx;
  z-index: 100;
	.wave {
		position: relative;
		width: 100%;
		height: 100%;
		background-image: linear-gradient(-180deg, #f9b95e 13%, #F9921C 91%);
		border-radius: 50%;
	}
}
</style>
