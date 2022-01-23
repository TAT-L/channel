<script>
	import login from './units/login.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			
			//获取设备类型
			let platform = uni.getSystemInfoSync().platform
			console.log(platform)

			uni.setStorage({
				key: 'platform',
				data: {
					'platform': platform
				},
				success: function() {
				
					if (platform === 'windows') {
						console.log("跳转至pc登陆页面")
						uni.reLaunch({
							url: './subPage1/pcLogin/pcLogin'
						})
					} else {
						login().then(res => {
							if (res.data.detail.status === 2) {
								console.log("审核通过，跳转至首页")
								uni.switchTab({
									url: '/pages/index/index'
								});
							}
						})
						
					}
				},
				fail() {}
			});
			console.log()



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
</style>
