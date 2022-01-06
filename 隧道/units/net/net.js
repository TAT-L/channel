import axios from "axios";
import {getToken} from "./cookie.js"
import login from '../login.js'

const instance = axios.create({
	baseURL: "http://192.168.10.10:5206/api",
	// baseURL: "http://192.168.10.25:8001",
	timeout: 60000,
	withCredentials: true
})

instance.interceptors.request.use(
	config => {
		console.log(config)
		config.url = config.baseURL + config.url
		// if (getToken()) {
		// 	config.headers = {
		// 		"c": getToken()
		// 	}
		// }
		return config
	},
	err => {
		return Promise.reject(err);
	}
)
instance.interceptors.response.use(response => {
	console.log(response)
	// if (response.data.success == true) {
	// 	return response.data
	// }
	//  else {
	// 	// return Promise.resolve(response)
	// 	// return response.data.message
	// 	return response.data.message
	// }
 //    if(response.code == 401){
	// 	console.log("登陆过期，重新登陆")
	// 	login()
	// }
}, error => {
	return Promise.resolve(error.response)
})
export default instance
