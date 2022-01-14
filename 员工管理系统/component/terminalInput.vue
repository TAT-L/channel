<template>
	<view class="popup">
		<view class="box">
			<view class="title">
				设备录入
			</view>
			<view class="ActivityTime">
				<!-- <text>请输入设备序列号</text> -->
				<view class="input">
					<el-input placeholder="请输入内容" v-model="value">
						<template slot="prepend">请输入序列号</template>
					</el-input>
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
	import {terminalBind} from '../models/baseModel.js'
	export default {
		name: "TimeList",
		props: {
			show: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				value: ''
			}
		},
		methods: {
			back() {
				console.log(this.value)
				this.$emit("back", false);
			},
			adopt() {
				console.log(this.value)
				terminalBind({
					sn:this.value
				})
				.then(res=>{
					console.log(res)
					if(res.statusCode===404){
						this.$message({
							message: '没有找到序列号',
							type: "error"
						})
					}else{
						this.$emit("back", false);
					}
				})
				.catch(err=>{
					console.log(err,"wwwww")
					// this.$message({
					// 	message: '没有找到序列号',
					// 	type: "success"
					// })
				})
				
			}
		},
		created() {}
	}
</script>

<style>
	.input{
		width: 94%;
	}

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
		align-items: center;
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
