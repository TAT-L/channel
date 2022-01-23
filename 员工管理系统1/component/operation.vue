<template>
	<view class="  popup" v-loading="loading" element-loading-text="数据上传中" element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<view class="box">
		<view>
		    <uni-calendar 
		    ref="calendar"
		    :insert="true"
			:date="data"
			:dateArr="dataArr"
		    @confirm="confirm"
			@ArrChange="ArrChange"
		     />
		</view>
			<view class="btn button">
				<el-button type="primary" round @click="back">返回</el-button>
			</view>
		</view>
	</view>
</template>
<script>
	import {
		WorkerTicket
	} from '../models/baseModel.js'
	import {
		WorkerTicketPost
	} from '../models/baseModel.js'
	import Time from '../units/net/time.js'
	export default {
		name: "operation",
		props: {
			flag: {
				type: Boolean,
				default: false
			},
			id: {
				type: Number,
				default: -1
			}
		},
		created() {
				WorkerTicket({
					workerId:this.id
				})
				.then(res=>{
					console.log(res)
					this.dataArr=res.data.detail.date
					
				})
		},
		data() {
			return {
				// value:[],
				// workers: [],
				// checkedCities: [],
				// show: false,
				// activeName: 'first',
				// user: ['2022-1-19'],
				// leftData: [],
				// rightData: [],
				loading: false,
				data:["2022-01-01"],
				dataArr:["2021-01-01","2021-01-02","2021-01-03","2021-02-04"]
			};
		},
		methods: {
			ArrChange(e){
				console.log(e)
				WorkerTicketPost({
					workerId:this.id,
					data:{
						date:e
					}
				})
				.then(res=>{
					console.log(res)
					if(res.statusCode==403){
						this.$message({
							message: res.data.detail,
							type: "error"
						})
					}
				})
				.catch(err=>{
					console.log(err)
				})
			},
			 open(){
			            this.$refs.calendar.open();
			        },
			        confirm(e) {
			            console.log(e);
			        },
			back() {
				this.$emit("goBack", false);
			},
			mooths(){
				this.$refs.picker.$refs.reference.$refs.input.focus()
			},
			mooth(e) {
				// this.$refs.saveDateInput.$refs.reference.$refs.input.focus()
				console.log(e)
				console.log(this.user)
				let list=[];
				for(let i=0;i<this.user.length;i++){
					list.push(Time.formatTime(this.user[i]))
				}
				console.log(list)
				WorkerTicketPost({
					workerId:this.id,
					data:{
						dateLis:list
					}
				})
				.then(res=>{
					console.log(res)
				})
				.catch(err=>{
					console.log(err)
				})
				// console.log(Time.formatTime(e))
				// console.log(this.getCountDays(e))
				// console.log(this.getweekday(e))
				// // console.log(Time.parseTime(Time.transformTo(e)))			
				// console.log(Time.formatTime(e),"www")
				// e.setDate(1)
				// console.log(Time.formatTime(e),"www")
				// for(let i=0;i<this.getCountDays(e);i++){
				// 		e.setDate(i+1)
				// 	console.log(Time.formatTime(e)+this.getweekday(e))
				// }
				// console.log(this.getweekday(e))
			},
			// change(e1, e2, e3) {
			// 	console.log(e1)
			// 	console.log(e2)
			// 	console.log(e3)
			// 	console.log(this.leftData)
			// 	console.log(this.rightData)
			// 	this.loading = true
			// 	if (e2 == "right") {
			// 		tickeAppend({
			// 				id: this.id,
			// 				data: {
			// 					workers: e3
			// 				}
			// 			})
			// 			.then(res => {
			// 				this.loading = false
			// 			})
			// 			.catch(err => {
			// 				this.loading = false
			// 				reData()
			// 				this.$message({
			// 					message: '服务器错误',
			// 					type: "error"
			// 					})
			// 		})
			// 	} else {
			// 		tickeRemove({
			// 				id: this.id,
			// 				data: {
			// 					workers: e3
			// 				}
			// 			})
			// 			.then(res => {
			// 				this.loading = false
			// 			})
			// 			.catch(err => {
			// 				this.loading = false
			// 				reData()
			// 				this.$message({
			// 					message: '服务器错误',
			// 					type: "error"
			// 				})
			// 			})
			// 		console.log("left")
			// 	}
			// },
			// leftCheckChange(e) {
			// 	console.log(e)
			// 	this.leftData = e
			// 	console.log(this.user)
			// },
			// rightCheckChange(e) {
			// 	this.rightData = e
			// 	console.log(this.user)
			// },
			// // DataCange(data, index) {
			// // 	for (let item in data) {
			// // 		this.data[index].people.push(this.workers[item])
			// // 	}
			// // 	this.data[index].len = data.length
			// // },
			// handleClick(tab, event) {
			// 	console.log(tab, event);
			// },
		 //    reData(){
			// 	 workList()
			// 	 	.then(res => {
			// 	 		console.log(res.data.detail.workers)
			// 	 		console.log(this.workers)
			// 	 		this.workers = res.data.detail.workers
			// 	 	})
			// 	 	.catch(err => {
			// 	 		console.log(err)
			// 	 	})
			// 	 tickeDetail({
			// 	 		id: this.id
			// 	 	})
			// 	 	.then(res => {
			// 	 		console.log(res.data.detail.users[0].id)
			// 	 		if (res.data.detail.users) {
			// 	 			for (let i = 0; i < res.data.detail.users.length; i++) {
			// 	 				this.user.push(res.data.detail.users[i].id)
			// 	 			}
			// 	 		}
				 
				 
			// 	 	})
			// 	 	.catch(err => {
			// 	 		console.log(err)
			// 	 	})
			// },
			// btns() {
			// 	let data = this.data
			// 	let flag = true;
			// 	for (let i = 0; i < data.length; i++) {
			// 		let string = ''
			// 		if (data[i].people.length == 0) {
			// 			this.$message({
			// 				message: data[i].name + '信息未填写完整',
			// 				type: "error"
			// 			})
			// 			flag = false;
			// 			break;
			// 		}
			// 		for (let j = 0; j < data[i].people.length; j++) {
			// 			if (j != data[i].people.length - 1) {
			// 				string += data[i].people[j] + "、"
			// 			} else {
			// 				string += data[i].people[j]
			// 			}
			// 		}
			// 		data[i].strings = string
			// 	}
			// 	if (flag) {
			// 		this.data = data
			// 		this.show = true
			// 	}
			// }
		},
	}
</script>

<style scoped>
	.box {
		/* width: 100%; */
		min-height: 80vh;
		/* margin-left: 10%; */
		border: 1px solid #999999;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: #fff;
		padding: 40rpx 100rpx;
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.marginTop {
		margin-top: 40rpx;
	}

	.margin {
		margin: 40rpx 0;
	}

	.title {
		text-align: center;
		font-weight: 900;
		font-size: 60rpx;
	}

	.el-checkbox {
		font-size: 40rpx;
	}

	.el-checkbox__input {
		font-size: 40rpx;
	}

	/deep/ .el-checkbox__label {
		font-size: 40rpx !important;
	}

	/* 	/deep/ .el-checkbox__inner{
		width: 40rpx;
		height: 40rpx;
	} */
	.operationItem {
		margin: 40rpx 10rpx;
		padding: 10rpx 20rpx;
		/* background-color: #000000; */
		/* border: 1px solid #409EFF; */
		box-shadow: 1px 2px 8px #C8CBC8;

	}

	.IiemBox {
		display: flex;
	}

	.itemUi {
		flex: 3;
		/* border: 1px solid black; */
		padding: 20rpx 20rpx;
	}

	.itemSum {
		flex: 1;
		/* border: 1px solid pink; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/deep/ .el-popover {
		position: relative;
	}

	.itemData {
		font-size: 35rpx;
	}

	.button {
		display: flex;
		justify-content: space-around;
	}

	.btn {
		padding: 20rpx 40rpx;
		color: #000;
		/* background-color: #f8f8f8; */
		font-size: 36rpx;
		cursor: pointer;
	}

	/deep/ .el-transfer-panel__body {
		height: 800rpx;
	}

	/deep/ .el-transfer-panel__list.is-filterable {
		height: 800rpx;
	}

	/deep/ .el-tab-pane,
	/deep/.el-tabs__nav-scroll {
		display: flex;
		justify-content: center;
	}

	/deep/ .el-transfer-panel {
		width: 650rpx;
	}
	/deep/ .el-picker-panel{
		margin: 40rpx 0;
	}
	#picker{
		width: 8000rpx;
	}
</style>
