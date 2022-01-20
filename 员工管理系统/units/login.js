import {loginApi} from '../models/baseModel.js'

// 登陆函数
export default  ()=>{
	// 获取code
	return new Promise((resolve, reject) => {
		uni.login({
		provider: 'weixin',
		success: res => {
			// 获取cookie
			loginApi({
				code: res.code
			}).then(res => {
				resolve(res)
				console.log(res)
				// 存储cookie
				uni.setStorage({
					key: 'cookie',
					data: {
						cookie: 'Bearer '+res.data.detail.token
					},
					success: function() {
						// console.log(uni.getStorageSync('cookie'))
					},
					fail() {}
				})
				//存储登陆状态
				uni.setStorage({
					key: 'status',
					data: res.data.detail.status,
					success: function() {
						
					},
					fail() {}
				});
				//存储身份
				getApp().globalData.identity = res.data.detail.permissions
			}).catch(err => {
				console.log('登陆失败', err)
			})
		}
	});
	})
	
	
}
