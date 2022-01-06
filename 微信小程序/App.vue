
<script>
	import login from './units/login.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			login()
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
	/*每个页面公共css */
	*{
		color: #fff;
	}
</style>
