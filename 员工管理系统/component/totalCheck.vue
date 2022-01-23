<template>
	<view class="box marginTop">
		<!-- #ifndef MP -->
		
		
		<view class="title">
			员工考勤模块
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
				<el-date-picker v-model="value2" type="daterange" align="right" unlink-panels range-separator="至"
					start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions" @change="changeTime()">
				</el-date-picker>
			</view>
			<view class="table">
				  <el-popover
				    placement="left-end"
				    title="标题"
				    width="200"
				    trigger="hover"
				    content="应到15次,实到14次,缺勤一次">
				    <el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'created_at'}" slot="reference">
				    	<el-table-column prop="arrival_time" sortable label="考勤时间" width="200">
				    	</el-table-column>
				    	<el-table-column prop="realname" label="考勤人员" width="200">
				    	</el-table-column>
				    	<el-table-column  prop="phone" label="考勤状态" width="200">
				    		<template slot-scope="scope">
				    			<span style="margin-left: 10px">{{ scope.row.end_time }}</span>
				    			<i class="el-icon-success" v-if="flags"></i>
				    			<i class="el-icon-error" v-else></i>
				    		</template>
				    	</el-table-column>
				    	<el-table-column fixed="right" label="操作">
				    		<template slot-scope="scope">
				    			<el-button @click="handleClick(scope.row)" type="danger" size="small">手动考勤</el-button>
				    		</template>
				    	</el-table-column>
				    </el-table>
				  </el-popover>
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>

<script>
	import time from "../units/net/time.js"
	import {
		attendanceList
	} from '../models/baseModel.js'
	export default {
		name: "totalcheck",
		created() {
			console.log(this.value2)

		},
		mounted() {
			console.log(time.parseTime(time.transformTo(this.value2)))
			let dateTime = this.value2.setDate(this.value2.getDate() + 1);
			console.log(time.parseTimes(time.transformTo(this.value2)))
			console.log(time.parseTime(1640361600000))
			console.log(time.parseTime(1640361600000 + 86400000))
			// dateTime=dateTime.setDate(dateTime.getDate()+1);
		},
		data() {
			return {
				pickerOptions: {
					shortcuts: [{
						text: '最近一周',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', [start, end]);
						}
					}, {
						text: '最近一个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
				 		picker.$emit('pick', [start, end]);
						}
				 }, {
						text: '最近三个月',
						onClick(picker) {
							const end = new Date();
							const start = new Date();
							start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
				  	picker.$emit('pick', [start, end]);
						}
					}]
				},
				value2: new Date(),
				whichId: -1,
				flags: true,
				endTime: '',
				tableData: [],
				options: [{
					value: 0,
					label: '已考勤',
					name: "0"
				}, {
					value: 1,
					label: '未考勤',
					name: "1"
				}],
				value: '已考勤',
			}
		},
		methods: {
			change(e) {
				console.log(e)
				console.log("sddd")
				if (e == 0) {
					this.flags = true
					this.tableData = this.checked
				} else {
					this.flags = false
					this.tableData = this.nocheck

				}
			},
			changeTime(e) {
				let data = this.value2
				console.log(data)
				// console.log(time.transformTo(data))
				// console.log(time.transformTo(this.value2) + 86400000)
			}
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
