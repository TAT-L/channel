import {
	apiResquest
} from '../units/net/http.js'

export const postAvatar = (query) => {
	return apiResquest({
		url: '/user/information/worker',
		method: 'POST',
		query: query
	})
}

export const getAvatar = (query) => {
	return apiResquest({
		url: '/user/information/worker',
		method: 'GET'
	})
}