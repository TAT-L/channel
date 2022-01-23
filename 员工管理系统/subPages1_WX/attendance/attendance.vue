<template>
	<view class="content">
		<view class="text">
			<text>人员考勤系统</text>
		</view>
		<view class="page">
			<uni-section :title="'日期用法：' + single" type="line"></uni-section>
			        <view class="example-body">
			            <uni-datetime-picker
			                type="date"
			                :value="single"
			                
			                @change="change"
			            />
			        </view>
			<view class="margin flex">
				<uni-combox :candidates="tickeData" placeholder="选择操作票类型" v-model="ticke"></uni-combox>
			</view>
			<tab :tableData="data" :title="title" :headers="headers" :name="name" class="margin"></tab>
		</view>
	</view>
</template>

<script>
	// import {invitationAppend} from '../../models/baseModel.js'
	import tab from '../../components/tab.vue'
	import {attendanceTime} from '../../models/baseModel.js'
	import {
		attendanceList
	} from '../../models/baseModel.js'
	import time from '../../units/net/time.js'
	export default {
		data() {
			return {
				data: [{
					"date1": "2020-09-01",
					"date2": "李四",
					"type": "daily",
					"date3": "2020-09-01",
				}],
				single: [new Date],
				range: ["2021-03-8", "2021-4-20"],
				headers: [50, 70, 30, 20],
				title: ["考勤时间", "考勤人员", "考勤状态", "操作"],
				name: ["date1", "date2", "type"],
				tickeData:[{
						value: '已考勤',
						label: '已考勤'
					},
					{
						value: '未考勤',
						label: '未考勤'
					}
				],
				ticke:""
			}
		},
		components: {
			tab
		},
		onLoad() {

		},
		methods: {
			change(e) {
				this.single = e;
				console.log("-change事件:", e);
				// console.log(time.transformTo(e))
				// console.log(time.transformTo("2021-01-05"))
				// console.log(time.parseTime(Date.parse(e)))
				attendanceTime({
					time:time.transformTo(e)
					// end:time.transformTo(this.value2)+86400000
				})
				.then(res=>{
					console.log(res.data)
					// this.nocheck=res.data.detail.users
					// this.checked=res.data.detail.attendees
					// this.tableData=this.checked
					
					// 	for(let j=0;j<res.data.detail.attendees.length;j++){
					// 		res.data.detail.attendees[j].flag=true
					// 		 for(let i=0;i<res.data.detail.users.length;i++){
					// 		if(res.data.detail.attendees[j].id==res.data.detail.users[i].id){
					// 			res.data.detail.attendees[j].user=res.data.detail.users[i].user
					// 			break
					// 		}
					// 	}
					// }
				 //    let newArray = [];
					// // let data=this.checked
				 //    for(let item in res.data.detail.users){
					// 	console.log(item)
					// 	let flag=true;
					// 	for( let items in res.data.detail.attendees){
					// 		if(res.data.detail.users[item].id==res.data.detail.attendees[items].id){
					// 			res.data.detail.users[item].flag=false
					// 			flag=false
					// 			break;
					// 		}
					// 	}
					// 	 if(flag){
					// 		 newArray.push(res.data.detail.users[item])
					// 	 }
					// }
					// this.nocheck=res.data.detail.users
					// // this.allPeople=res.data.detail.users
					// this.checked=res.data.detail.attendees
				 //    console.log(newArray);
					// this.nocheck=newArray;
					// // this.allPeople=this.checked
					// console.log(this.checked)
					// let data=[]
					// console.log(data)
					// for(let item in this.nocheck){
					// 	console.log(this.nocheck[item])
					// 	data.push(this.nocheck[item])
					// }
					// for(let item in this.checked){
					// 	console.log(this.checked[item])
					// 	data.push(this.checked[item])
					// }
					// this.allPeople=data
					// this.tableData=this.allPeople
				   
				})
				.catch(err=>{
					console.log(err)
				})
			},
		},
		watch: {
			range(newval) {
				console.log("范围选:", this.range);
			},
		}

	}
</script>

<style lang="scss">
	.view {
		border: 1px solid $main-color;
		// height: 50rpx;
		border-radius: 20rpx;
	}

	.input {
		// display: inline-block;
		border: none;
		padding: 10rpx 10rpx;
	}

	.name {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;

		.nameInput {}

	}

	.phoneNumber {
		display: flex;
		align-items: center;
	}

	.text {
		display: flex;
		font-weight: 600;
		align-items: center;
		justify-content: center;
		padding: 20rpx 40rpx;
		font-size: 42rpx;
	}

	.button {
		width: 80%;
		margin-left: 10%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 20rpx 20rpx;
		border-bottom: 1rpx solid #8F939C;
	}

	.btn {
		margin: 0 !important;
		width: 100rpx !important;
		padding-left: 0;
		padding-right: 0;
		font-size: 25rpx;
		border-color: #409EFF;
		padding: none !important;
		background-color: #409eff !important;
		color: #FFFFFF !important;
		border-radius: 20rpx;
	}
	.margin{
		margin: 40rpx 0;
	}
	.flex{
		width: 40%;
		position: relative;
		left: 400rpx;
	}
</style>

