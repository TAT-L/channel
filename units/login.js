import loginApi from './net/http.js'
import {setToken} from './net/cookie.js'
// 登陆函数
export default (prams) => {
	// 获取code
	uni.login({
		provider: 'weixin',
		success: res => {
			// 后端获取cookie
			loginApi.post({
				url:"/login/wechat",
				data:{
					code:res.code
				} 
			}).then(res => {
				let status = res.data.status
				if (status) {
					uni.getUserProfile({
						desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
						success: (res) => {
							console.log(res)
							//上传用户信息

						}
					})
				}
				setToken(res.c)
			
			})

		}
	});

}
