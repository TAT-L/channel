import {
	apiResquest
} from '../units/net/http.js'

export const attendanceList = (query) => {
	return apiResquest({
		url: '/manager/attendance/list?start='+query.start+"&end="+query.end,
		method: 'get'
	})
}


export const attendanceTime = (query) => {
	return apiResquest({
		url: '/manager/attendance/time/'+query.time,
		method: 'get'
	})
}


export const workerTime = (query) => {
	return apiResquest({
		url: '/worker/attendance/time/'+query.time,
		method: 'get'
	})
}

// 用户注册
export const registerApi = (query) => {
	return apiResquest({
		url: '/user/register',
		method: 'POST',
		query: query
	})
}
// 获取管理员列表
export const getManagerList = (query) => {
	return apiResquest({
		url: '/user/manager/list',
		method: 'GET'
	})
}
// 登陆
export const loginApi = (query) => {
	return apiResquest({
		url: '/login/wechat',
		method: 'POST',
		query: query
	})
}

//PC端判断二维码扫描状态
export const pcLogin = (query) => {
	return apiResquest({
		url: '/login/qrcode/check',
		method: 'POST',
		query: query
	})
}

//手机扫描二维码
export const scanQRcode = (query) => {
	return apiResquest({
		url: '/user/qrcode/information',
		method: 'POST',
		query: query
	})
}

//手机扫描二维码,确认登陆
export const confirmPcLogin = (query) => {
	return apiResquest({
		url: '/user/qrcode/confirm',
		method: 'POST',
		query: query
	})
}
export const workList = (query) => {
	return apiResquest({
		url: '/manager/worker/list',
		method: 'get'
	})
}
export const ticketList = (query) => {
	return apiResquest({
		url: '/manager/ticket/list',
		method: 'get'
	})
}
export const tickeCreate = (query) => {
	return apiResquest({
		url: '/manager/ticket/create',
		method: 'POST',
		query: query
	})
}
// 已添加人员列表
export const tickeDetail = (query) => {
	return apiResquest({
		url: '/manager/ticket/'+query.id+'/worker/list',
		method: 'get',
	})
}
// 操作票添加人员
export const tickeAppend = (query) => {
	return apiResquest({
		url: '/manager/ticket/'+query.id+'/append',
		method: 'post',
		query: query.data
	})
}
// 操作票移除人员
export const tickeRemove = (query) => {
	return apiResquest({
		url: '/manager/ticket/'+query.id+'/remove',
		method: 'post',
		query: query.data
	})
}
export const invitationAppend = (query) => {
	return apiResquest({
		url: '/manager/invitation/append',
		method: 'post',
		query: query
	})
}
export const invitationList = (query) => {
	return apiResquest({
		url: '/manager/invitation/list',
		method: 'get'
	})
}
export const invitationRemove = (query) => {
	return apiResquest({
		url: '/manager/invitation/'+query.id+'/delete',
		method: 'delete'
	})
}


export const attendanceTimeWork = (query) => {
	return apiResquest({
		url: '/manager/attendance/time/'+query.time+'/worker/'+query.id,
		method: 'get'
	})
}
export const terminalList = (query) => {
	return apiResquest({
		url: '/manager/terminal/list',
		method: 'get'
	})
}
export const terminalBind = (query) => {
	return apiResquest({
		url: '/manager/terminal/bind',
		method: 'post',
		query:{
			sn:query.sn
		}
	})
}
export const terminalUnbind = (query) => {
	return apiResquest({
		url: '/manager/terminal/unbind',
		method: 'delete',
		query:{
			sn:query.sn
		}
	})
}
// 设备人员添加
export const terminalAppend = (query) => {
	return apiResquest({
		url: '/manager/terminal/'+query.sn+'/append/worker',
		method: 'post',
		query: query.data
	})
}
// 设备人员移除
export const terminalRemove = (query) => {
	return apiResquest({
		url: '/manager/terminal/'+query.sn+'/remove/worker',
		method: 'post',
		query: query.data
	})
}
// 设备已添加人员
export const terminalDetail = (query) => {
	return apiResquest({
		url: '/manager/terminal/'+query.sn+'/worker/list',
		method: 'get',
	})
}
// 未审核列表
export const registerUncheckList = (query) => {
	return apiResquest({
		url: '/manager/register/uncheck/list',
		method: 'get',
	})
}
// 已审核列表
export const registerCheckedList = (query) => {
	return apiResquest({
		url: '/manager/register/checked/list',
		method: 'get',
	})
}
// 机器人员添加
export const registerApprove = (query) => {
	return apiResquest({
		url: '/manager/register/user/'+query.id+'/approve',
		method: 'post'
	})
}
// 机器人员移除
export const registerReject = (query) => {
	return apiResquest({
		url: '/manager/register/user/'+query.id+'/reject',
		method: 'post'
	})
}
export const terminalSyncWorker = (query) => {
	return apiResquest({
		url: '/manager/terminal/'+query.sn+'/syncWorker',
		method: 'post'
	})
}
export const WorkerTicket = (query) => {
	return apiResquest({
		url: '/manager/worker/'+query.workerId+'/date',
		method: 'get'
	})
}
export const WorkerTicketPost = (query) => {
	return apiResquest({
		url: '/manager/worker/'+query.workerId+'/date/update',
		method: 'post',
		query:query.data
	})
}
export const WorkersUpdate = (query) => {
	return apiResquest({
		url: '/manager/workers/date/update',
		method: 'post',
		query:query.data
	})
}
// /api/manager/workers/date/update
// // manager/worker/:workerID/date/update
// // updata 覆盖式更新
// // append 添加
// // remove 移除




