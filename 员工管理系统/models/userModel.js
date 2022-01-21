import {
	apiResquest
} from '../units/net/http.js'
// 上传头像
export const postAvatar = (query) => {
	return apiResquest({
		url: '/worker/face',
		method: 'POST',
		query: query
	})
}
//获取头像
export const getAvatar = (query) => {
	return apiResquest({
		url: '/worker/face',
		method: 'GET'
	})
}
// 获取用户信息
export const getWorkerInfo = (query) => {
	return apiResquest({
		url: '/user/information',
		method: 'GET'
	})
}
//长传用户信息
export const postWorkerInfo = (query) => {
	return apiResquest({
		url: '/user/information',
		method: 'POST',
		query: query
	})
}