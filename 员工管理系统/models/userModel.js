import {
	apiResquest
} from '../units/net/http.js'

export const postAvatar = (query) => {
	return apiResquest({
		url: '/worker/face',
		method: 'POST',
		query: query
	})
}

export const getAvatar = (query) => {
	return apiResquest({
		url: '/worker/face',
		method: 'GET'
	})
}