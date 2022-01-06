<template>
	<view class="content">
		<view class="text">
			<text>人员考勤系统</text>
		</view>
		<view class="page">
			<uni-section :title="'日期范围用法：' + '[' + range + ']'" type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker v-model="range" type="daterange" :clearIcon="false"
					rangeSeparator="至" />
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
	import tab from '../../models/tab.vue'
	import {
		attendanceList
	} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				data: [{
					"date1": "2020-09-01",
					"date2": "李四",
					"type": "daily",
					"date3": "2020-09-01",
				}],
				single: "2021-04-3",
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
