<template>
	<view class="popup">
		<view class="box">
			<view class="ActivityTime">
				<image :src="url" mode="widthFix"></image>
			</view>
			<view class="button btn">
				<el-button type="primary" plain @click="back">返回</el-button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "popup",
		props: {
			sn: {
				type: String,
				default: ''
			},
			url:{
				type:String,
				default:''
			}
		},
		created() {

		},
		data() {
			return {
				tableData: [],
			};
		},
		methods:{
			back(){
				this.$emit("back", false);
			}
		}

	}
</script>

<style>
	.view{
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
	}
	.Success{
		background-color: #67C23A;
	}
	.Info{
		background-color: #909399;
	}
	.Danger{
		background-color: #F56C6C;
	}
	.imgs {
		width: 80%;
		height: 80%;
		margin-top: 10%;
		margin-left: 10%;
	}

	.img {
		width: 100%;
		height: 100%;
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
		min-height: 600rpx;
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
