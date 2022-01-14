<template>
	<view class="popup">
		<view class="box">
			<view class="title">
				打卡记录
			</view>
			<view class="ActivityTime">
            <view class="table">
            	<el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'created_at'}">
            		<el-table-column prop="arrival_at" sortable label="考勤时间" width="200">
            		</el-table-column>
            		<el-table-column  label="考勤人员" width="150">
						{{user.name}}
            		</el-table-column>
            		<el-table-column class="red" prop="terminal.name" label="所在设备" width="150">

            		</el-table-column>
            		<el-table-column fixed="right" label="电话">
            			{{user.phone}}
            		</el-table-column>
            	</el-table>
            </view>
			</view>
			<view class="button btn">
				<el-button type="primary" plain @click="back">取消</el-button>
			</view>
		</view>
	</view>
</template>

<script>

		export default {
		name: "TimeList",
		props: {
			show: {
				type: Boolean,
				default: false
			},
			user: {
				type: Object,
				default: {name:'',phone:""}
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
				value: ''
			}
		},
		methods: {
			back() {
				this.$emit("back", false);
			},
			adopt() {
		}
	},
	created() {
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

