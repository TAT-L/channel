<script>
	
	import login from './units/login.js'
	export default {
		
		globalData: {  
		            identity: []  
		        },
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
						let status = uni.getStorageSync('status')
						console.log(status)
						if (status != 2) {
							uni.navigateTo({
								url: './subPages_PC/pcLogin/pcLogin'
							})
						}

					} else {
						
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
