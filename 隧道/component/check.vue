<template>
	<view class="box marginTop">
		<lists v-show="show" :tableData="listData" :user="user" @back="back"></lists>
		<view class="title">
			人员考勤系统
		</view>
		<view class="create">
			<el-select v-model="value" placeholder="请选择" @change="change($event)">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
				</el-option>
			</el-select>
		</view>
		<el-divider></el-divider>
		<view class="flex">
			<view class="time">
				<el-date-picker v-model="value2" align="left" type="date" placeholder="选择日期" @change="changeTime()">
				</el-date-picker>
			</view>
			<view class="table">
				<el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'created_at'}">
					<el-table-column prop="last_arrival_at" sortable label="考勤时间" width="200">
					</el-table-column>
					<el-table-column prop="user.name" label="考勤人员" width="200">
					</el-table-column>
					<el-table-column class="red" prop="phone" label="考勤状态" width="200">
						<template slot-scope="scope">
							<!-- <span style="margin-left: 10px">{{ scope.row }}</span> -->
							<i class="el-icon-success" v-if="scope.row.flag"></i>
							<i class="el-icon-error" v-else></i>
						</template>
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">查看考勤表</el-button>
						</template>
					</el-table-column>
				</el-table>
			</view>
		</view>
	</view>
</template>

<script>
	import time from "../units/net/time.js"
	import lists from "./TimeList.vue"
	// import {attendanceList} from '../models/baseModel.js'
	import {attendanceTime} from '../models/baseModel.js'
	import {attendanceTimeWork} from '../models/baseModel.js'
	export default {
		name: "checks",
		created() {
			console.log(this.value2)
		},
		components:{
			lists
		},
		mounted() {
			console.log(time.parseTime(time.transformTo(this.value2)))
			let dateTime = this.value2.setDate(this.value2.getDate() + 1);
			console.log(time.parseTimes(time.transformTo(this.value2)))
						console.log(time.parseTime(1640361600000))
						console.log(time.parseTime(1640361600000+86400000))
			// dateTime=dateTime.setDate(dateTime.getDate()+1);
			           // this.getdata()
			let data=new Date()
			console.log(time.transformTo(data))
			console.log(time.parseTimes(time.transformTo(data)))
			console.log(time.transformData(time.parseTimes(time.transformTo(data))))
			this.value2=time.transformData(time.parseTimes(time.transformTo(data)))
			 this.getdata()
		},
		data() {
			return {
				value2: new Date(),
				show: false,
				flag: false,
				whichId: -1,
				flags: true,
				endTime: '',
				tableData: [],
				options: [{
					value: 0,
					label: '已考勤员工',
					name: "0"
				}, {
					value: 1,
					label: '未考勤员工',
					name: "1"
				},
				{
					value: 2,
					label: '所有员工',
					name: "1"
				}],
				value: '所有员工',
				checked: [],
				nocheck: [],
				allPeople:[],
				listData:[],
				user:{}
			}
		},
		methods: {
			change(e) {
				console.log(e)
				console.log("sddd")
				if (e == 0) {
					this.flags = true
					this.tableData = this.checked
				}else if(e==2){
					console.log("事实上1")
					this.flags = false
					this.tableData = this.allPeople
				}else {
					this.flags = false
					this.tableData = this.nocheck

				}
			},
			getdata(){
				attendanceTime({
					time:this.value2
					// end:time.transformTo(this.value2)+86400000
				})
				.then(res=>{
					console.log(res.data)
					// this.nocheck=res.data.detail.users
					// this.checked=res.data.detail.attendees
					// this.tableData=this.checked
					
						for(let j=0;j<res.data.detail.attendees.length;j++){
							res.data.detail.attendees[j].flag=true
							 for(let i=0;i<res.data.detail.users.length;i++){
							if(res.data.detail.attendees[j].id==res.data.detail.users[i].id){
								res.data.detail.attendees[j].user=res.data.detail.users[i].user
								break
							}
						}
					}
				    let newArray = [];
					// let data=this.checked
				    for(let item in res.data.detail.users){
						console.log(item)
						let flag=true;
						for( let items in res.data.detail.attendees){
							if(res.data.detail.users[item].id==res.data.detail.attendees[items].id){
								res.data.detail.users[item].flag=false
								flag=false
								break;
							}
						}
						 if(flag){
							 newArray.push(res.data.detail.users[item])
						 }
					}
					this.nocheck=res.data.detail.users
					// this.allPeople=res.data.detail.users
					this.checked=res.data.detail.attendees
				    console.log(newArray);
					this.nocheck=newArray;
					// this.allPeople=this.checked
					console.log(this.checked)
					let data=[]
					console.log(data)
					for(let item in this.nocheck){
						console.log(this.nocheck[item])
						data.push(this.nocheck[item])
					}
					for(let item in this.checked){
						console.log(this.checked[item])
						data.push(this.checked[item])
					}
					this.allPeople=data
					this.tableData=this.allPeople
				   
				})
				.catch(err=>{
					console.log(err)
				})
			},
			changeTime(e) {
				// this.endTime=this.value2
				let data = this.value2
				console.log(time.transformTo(data)) 
				console.log(time.transformTo(this.value2)+86400000)
				this.value2=time.transformTo(this.value2)
				this.getdata()
				// attendanceTime({
				// 	time:time.transformTo(this.value2)
				// 	// end:time.transformTo(this.value2)+86400000
				// })
				// .then(res=>{
				// 	console.log(res.data)
				// 	// this.nocheck=res.data.detail.users
				// 	// this.checked=res.data.detail.attendees
				// 	// this.tableData=this.checked
					
				// 		for(let j=0;j<res.data.detail.attendees.length;j++){
				// 			res.data.detail.attendees[j].flag=true
				// 			 for(let i=0;i<res.data.detail.users.length;i++){
				// 			if(res.data.detail.attendees[j].id==res.data.detail.users[i].id){
				// 				res.data.detail.attendees[j].user=res.data.detail.users[i].user
				// 				break
				// 			}
				// 		}
				// 	}
    //                 let newArray = [];
				// 	// let data=this.checked
    //                 for(let item in res.data.detail.users){
				// 		console.log(item)
				// 		let flag=true;
				// 		for( let items in res.data.detail.attendees){
				// 			if(res.data.detail.users[item].id==res.data.detail.attendees[items].id){
				// 				res.data.detail.users[item].flag=false
				// 				flag=false
				// 				break;
				// 			}
				// 		}
				// 		 if(flag){
				// 			 newArray.push(res.data.detail.users[item])
				// 		 }
				// 	}
				// 	this.nocheck=res.data.detail.users
				// 	// this.allPeople=res.data.detail.users
				// 	this.checked=res.data.detail.attendees
    //                 console.log(newArray);
				// 	this.nocheck=newArray;
				// 	// this.allPeople=this.checked
				// 	console.log(this.checked)
				// 	let data=[]
				// 	console.log(data)
				// 	for(let item in this.nocheck){
				// 		console.log(this.nocheck[item])
				// 		data.push(this.nocheck[item])
				// 	}
				// 	for(let item in this.checked){
				// 		console.log(this.checked[item])
				// 		data.push(this.checked[item])
				// 	}
				// 	this.allPeople=data
				// 	this.tableData=this.allPeople
                   
				// })
				// .catch(err=>{
				// 	console.log(err)
				// })
				// 86400000
				// console.log(time.parseTime(time.transformTo(this.value2)))
			},
			handleClick(e){
				this.show=true
				attendanceTimeWork({
					time:time.transformTo(this.value2),
					id:e.id
				})
				.then(res=>{
					console.log(res.data.detail)
					this.listData=res.data.detail.attendances
					this.user=res.data.detail.user
				})
				console.log(e)
			},
			back(e){
				this.show=e
			}
			// attendanceTime({
			// 	time:
			// })
		},
		created() {}
	}
</script>

<style>
	.box {
		width: 80%;
		min-height: 80vh;
		margin-left: 10%;
		/* border: 1px solid #999999; */
		box-sizing: border-box;
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

	.create {
		width: 80%;
		margin-left: 10%;
		display: flex;
		justify-content: right;
		border: ;
	}

	/deep/ .el-divider--horizontal {
		margin: 16rpx 0;
	}

	.table {

		width: 80%;
		margin-left: 10%;
	}

	/deep/ .el-button--small {
		font-size: 30rpx;
	}

	.red {
		color: red;
	}

	/deep/ .el-icon-success {
		color: #67C23A;
	}

	/deep/ .cell>span {
		margin-right: 20rpx;
	}

	/deep/ .el-icon-error {
		color: #F56C6C;
	}

	.flex {
		display: flex;
		margin-top: 100rpx;
	}
</style>
