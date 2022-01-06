<template>
	<view class="main">
		<view class="abilitis">
			<view class="ability" v-for="(item,key) in assembly" @click="jump(item)">
				<image :src="item.ruls" class="img" mode="aspectFill"></image>
				<view class="title">
					<text class="text">{{item.label}}</text>
				</view>
			</view>

		</view>
		<view class="box">

		</view>
	</view>
</template>

<script>
	export default {
		name: "indexMain",
		data() {
			return {
				// 小程序
				//#ifdef MP
				assembly: [{
					value: '/pages/Warehousing/Warehousing',
					label: "注册查看",
					ruls: require("../static/采集盒列表.png")
				}, {
					value: "/pages/attendance/attendance",
					label: "当日考勤",
					ruls: require("../static/考勤.png")
				}, {
					value: "/pages/create/create",
					label: "考勤总览",
					ruls: require("../static/考勤.png")
				}, {
					value: "/pages/work/work",
					label: "操作票",
					ruls: require("../static/操作票.png")
				}, {
					value: '/pages/enter/enter',
					label: "人员录入",
					ruls: require("../static/注册灰色.png")
				}],

				//#endif

				// PC
				//#ifndef MP
				assembly: [{
					value: '/pages/registrationAudit/registrationAudit?page=0',
					label: "注册查看",
					ruls: require("../static/采集盒列表.png")
				}, {
					value: '/pages/addWorker/addWorker?page=1',
					label: "人员录入",
					ruls: require("../static/注册灰色.png")
				}, {
					value: '/pages/registrationAudit/registrationAudit',
					label: "注册审核",
					ruls: require("../static/审核.png")
				}, {
					value: "/pages/attendancePC/attendancePC",
					label: "当日考勤",
					ruls: require("../static/考勤.png")
				}, {
					value: "/pages/workerView/workerView",
					label: "人员总览",
					ruls: require("../static/预设人员.png")
				}, {
					value: "/pages/operationTicket/operationTicket",
					label: "操作票",
					ruls: require("../static/操作票.png")
				}, {
					value: '/pages/equipmentManage/equipmentManage',
					label: "设备处理",
					ruls: require("../static/设备状态.png")
				}],
				//#endif


			};
		},
		methods: {
			jump(e) {
				console.log(e.value)
				uni.navigateTo({
					url: e.value
				});



			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {

		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx;
		width: 100vw;
		height: 100vh;
		background-color: $uni-bg-color-grey;
		.abilitis::-webkit-scrollbar {
			width: 0 !important 
			}
		.abilitis {
			background-color: $uni-bg-color;
			display: flex;
			justify-content: flex-start;
			flex-wrap: wrap;
			width: 90%;
			border-radius: 10px;
			box-shadow: 3px 3px 7px 7px #eee;
			padding-bottom: 40rpx;
			max-height: 500rpx;
			overflow: scroll;
			
			.ability {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin: 30rpx 10rpx;
				height: 140rpx;
				width: 140rpx;
				border-radius: 50%;
				position: relative;
				cursor: pointer;
				margin-left: 130rpx;

				.title {
					width: 140rpx;
					position: absolute;
					top: 130rpx;
					text-align: center;
					.text {
						font-size: 34rpx;
					}
				}

			}




		}

		.box {
			box-shadow: 3px 3px 7px 7px #eee;
			border-radius: 10px;
			background-color: $uni-bg-color;
			margin-top: 40rpx;
			height: 600rpx;
			width: 90%;
		}

	}

	.img {

		width: 100rpx;
		height: 100rpx;
	}
</style>
