export default {
	parseTime(timestamp) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

		let strDate = Y + M + D + h + m + s;
		console.log(strDate) //2020-05-08 17:44:56　
		return strDate;
	},
	parseTimes(timestamp) {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
		var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
		var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
		var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());

		let strDate = Y + M + D+"";
		console.log(strDate) //2020-05-08 17:44:56　
		return strDate;
	},
	transformTo(time) {
		return Date.parse(time)
	},
	transformData(time){
		var date = (new Date(Date.parse(time.replace(/-/g,"/")))).getTime();
		return date
	},
	transformMD(time1, time2) {
		var date1 = new Date(time1); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var M1 = (date1.getMonth() + 1 < 10 ? '0' + (date1.getMonth() + 1) : date1.getMonth() + 1) + '月';
		var D1 = (date1.getDate() < 10 ? '0' + date1.getDate() : date1.getDate()) + '日';
		var date2 = new Date(time2); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var M2 = (date2.getMonth() + 1 < 10 ? '0' + (date2.getMonth() + 1) : date2.getMonth() + 1) + '月';
		var D2 = (date2.getDate() < 10 ? '0' + date2.getDate() : date2.getDate()) + '日';

		let strDate = M1 + D1 + "——" + M2 + D2;
		return strDate;
	},
	transformZero(time){
		  
		  var str2 = Date.parse(new Date(time));
		  return str2;
	}

}
