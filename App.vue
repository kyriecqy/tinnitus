<script>

	export default {
		onLaunch: async function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	/*每个页面公共css */
	.uni-page-body, page {
		height: 100%;
		width: 100%;
	}
</style>
