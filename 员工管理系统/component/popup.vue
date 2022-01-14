<template>
	<view class="popup">
		<view class="box">
			<view class="title">
				数据预览{{value}}
			</view>
			<view class="ActivityTime">
				<view class="startTime">
					<text class="text">请选择开始时间</text>
					<el-date-picker v-model="starTime" type="datetime" placeholder="选择开始日期时间" align="right"
						@change="StarTChange">
					</el-date-picker>
				</view>
				<view class="startTime">
					<text class="text">请选择截止时间<text class="red">(非必填)</text></text>
					<el-date-picker v-model="endTime" type="datetime" placeholder="选择开始日期时间" align="right"
						@change="StarTChange($event)">
					</el-date-picker>
				</view>
				<view class="startTime">
					<text class="text">选择操作票类型</text>
					<el-select v-model="value" placeholder="请选择">
						<el-option v-for="item in cities" :key="item.value" :label="item.label" :value="item.value"
							>
							<span style="float: left">{{ item.label }}</span>
							<span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
						</el-option>
					</el-select>
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
	import {tickeCreate} from '../models/baseModel.js'
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
				value: ''
			};
		},
		methods: {
			back() {
				this.$emit("back", false);
			},
			adopt() {

			tickeCreate(
			{
				start_time:Time.transformTo(this.starTime),
				end_time:Time.transformTo(this.endTime),
				rule:this.value
			})
			.then(res=>{
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

	.ActivityTime {
		width: 1800rpx;
		min-height: 400rpx;
		margin: 20rpx 20rpx;
		display: flex;
		justify-content: space-around;
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
</style>
