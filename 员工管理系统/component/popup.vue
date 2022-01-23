<template>
	<view class="popup">
		<view class="box">
			<view class="title">
				新建操作票
			</view>
			<view class="ActivityTime">
<!-- 				<view class="tiems">
					<view class="startTime">
						<text class="text">请选择月份</text>
						<el-date-picker v-model="starTime" type="month" placeholder="选择月" @change="mooth($event)">
						</el-date-picker>
					</view>
				</view> -->
				<el-divider content-position="left"></el-divider>
				<view class="tiems">
					<view class="startTime">
						<!-- <text class="text">请选择人员</text> -->
						<el-transfer filterable filter-placeholder="请输入人名" v-model="user" :props="{
            								      key: 'id',
            								      label: 'description'
            								    }" :titles="['待选人员', '已选人员']" :button-texts="['移除', '添加']" :data="workers" @change="change"
							>
						</el-transfer>
					</view>
					<view class="divider">
						
					</view>
					<view class="startTime">
                        <span class="demonstration">多个日期</span>
                        <el-date-picker
                          type="dates"
                          v-model="value4"
                          placeholder="选择一个或多个日期"
						  format="yyyy-MM-dd"
						  value-format="yyyy-MM-dd"
						   @change="mooth($event)">
                        </el-date-picker>
					</view>
				</view>
			</view>
			<view class="button btn">
				<el-button type="primary" plain @click="back">取消</el-button>
				<el-button type="primary" plain @click="adopt()">提交</el-button>
			</view>
		</view>
	</view>
</template>

<script>
	import Time from '../units/net/time.js'
	import {
		workList
	} from '../models/baseModel.js'
	import {
		WorkersUpdate
	} from '../models/baseModel.js'
	export default {
		name: "popup",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			tableData: {
				type: Array,
				default: function() {
					return []
				}
			}
		},
		data() {
			return {
				endTime: '',
				starTime: "",
				cities: [{
						value: 'time',
						label: '默认'
					},
					{
						value: 'monthly',
						label: '每月'
					}, {
						value: 'weekly',
						label: '每周'
					}, {
						value: 'daily',
						label: '每天'
					}, {
						value: 'weekday',
						label: '每工作日'
					}
				],
				value: '',
				value4:'',
				workers:[
				],
				user:[]
			};
		},
		created() {
			workList()
			.then(res=>{
				console.log(res.data.detail.workers)
				this.workers=res.data.detail.workers
			})
		},
		methods: {
			back() {
				this.$emit("back", false);
			},
			mooth(e) {
				console.log(e)
				console.log(this.value4)
				let list=[];
				for(let i=0;i<this.value4.length;i++){
					list.push(Time.formatTime(this.value4[i]))
				}
				console.log(list)
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
			// getCountDays(curDate) {
			//         /* 获取当前月份 */
			//           var curMonth = curDate.getMonth();
			//         /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
			//         curDate.setMonth(curMonth + 1);
			//         /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
			//         curDate.setDate(0);
			//         /* 返回当月的天数 */
			//         return curDate.getDate();
					
			// },
			// getweekday(date){
			
			// var weekArray = new Array('日','一','二','三','四','五','六');
			
			// var week = weekArray[new Date(date).getDay()];//注意此处必须是先new一个Date
			
			// return '星期' +week;
			
			// },
			adopt() {

				WorkersUpdate({
						data:{
							workers:this.user,
							date:this.value4
						}
					})
					.then(res => {
						console.log("ok")
						this.$emit("back", false)
						this.$message({
							message: '提交成功',
							type: "success"
						})

					})

			},
			StarTChange(e) {
				console.log(e)
				console.log(Time.transformTo(e))
			},
			change(e){
				console.log(e)
				console.log(this.user)
			}
		}
	}
</script>

<style>
	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 10;

	}
    .divider{
		width: 4rpx;
		height: 800rpx;
		background-color: #DCDFE6;
	}
	.hei {
		width: 100%;
		height: 800rpx;
	}

	.box {
		background: #fff;
		border-radius: 10px;
		overflow: hidden;
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	.tiems {
		width: 90%;
		margin-left: 5%;
		display: flex;
		justify-content: space-around;
		padding: 10rpx;
	}

	.ActivityTime {
		width: 2800rpx;
		min-height: 1000rpx;
		margin: 30rpx 20rpx;
		/* 		display: flex;
		justify-content: space-around; */
	}

	.button {
		display: flex;
		justify-content: space-around;
	}

	.btn {
		padding: 20rpx 40rpx;
		color: #000;
		background-color: #f8f8f8;
		font-size: 36rpx;
		cursor: pointer;
	}

	.title {
		margin-top: 20rpx;
		text-align: center;
		font-size: 50rpx;
		font-weight: 500;
	}

	.startTime {
		display: flex;
		flex-direction: column;
	}

	.text {
		text-align: center;
		margin: 20rpx 0;
		font-size: 34rpx;
	}

	.red {
		color: red;
	}
	/deep/ .el-transfer-panel{
		max-height: 400px;
	}
	/deep/ .el-transfer-panel__body {
		height: 600rpx;
	}
	/deep/ .el-checkbox__label {
		font-size: 40rpx !important;
	}
	/deep/ .el-transfer-panel__list.is-filterable {
		height: 1000rpx;
	}
	/deep/ .el-input--small{
		font-size: 30rpx;
	}
	/deep/ .el-transfer-panel__filter .el-input__inner{
		font-size: 30rpx;
	}
</style>
