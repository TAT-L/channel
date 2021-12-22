import request from './net.js'

// export function posts(data) {
// 	return request({
// 		url: data.url,
// 		method: "post",
// 		data: data.data
// 	})
// }
// export function get(data) {
// 	return request({
// 		url: data.url,
// 		method: "get"
// 	})
// }
export default{
	post(data) {
		return request({
			url: data.url,
			method: "post",
			data: data.data
		})
	},
	get(data) {
		return request({
			url: data.url,
			method: "get"
		})
	}
}
