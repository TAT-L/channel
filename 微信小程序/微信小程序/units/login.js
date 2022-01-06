import {loginApi} from '../models/baseModel.js'

// 登陆函数
export default  (prams)=>{
	// 获取code
	uni.login({
		provider: 'weixin',
		success: res => {
			// 获取cookie
			loginApi({
				code: res.code
			}).then(res => {
				console.log(res)
				
				// 存储cookie
				uni.setStorage({
					key: 'cookie',
					data: {
						cookie: 'Bearer '+res.data.detail.token
					},
					success: function() {
						console.log(uni.getStorageSync('cookie'))
					},
					fail() {}
				});
			}).catch(err => {
				console.log('登陆失败', err)
			})
		}
	});

}
