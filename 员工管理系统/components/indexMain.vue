<template>
	<view class="main">
		<!-- 各个模块 -->
		<view class="abilitis">
			<view class="ability" v-for="(item,key) in assembly" @click="jump(item)">
				<image :src="item.ruls" class="img" mode="aspectFit"></image>
				<view class="title">
					<text class="text">{{item.label}}</text>
				</view>
			</view>
		</view>
		<!-- #ifdef H5 -->
		<!-- 报警与记录 -->
		<view class="alarmAndRecords">
			<view class="alarm" @click="triggerAlarm">
				<image class="image" src="../static/警报.jpeg" mode="aspectFit"></image>
				<text class="text">一键报警</text>
			</view>
			
			<view class="records" >
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="name">
						张三
					</view>
					<view class="equipmentNumber">
						一号入口
					</view>
					<view class="status">
						进入隧道
					</view>
				</view>
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="name">
						李四
					</view>
					<view class="equipmentNumber">
						一号入口
					</view>
					<view class="status">
						进入隧道
					</view>
				</view>
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="name">
						王二
					</view>
					<view class="equipmentNumber">
						一号入口
					</view>
					<view class="status">
						进入隧道
					</view>
				</view>
			</view>
		</view>
		<!-- #endif -->

		<!-- #ifdef MP -->
		<view class="boxs">
			<!-- 门禁记录 -->
			<view class="records" v-if="identity === 'manager'" >
					<view class="record box" v-for="item in gateInfo" :key="uuid()">
						<view class="time">
							{{item.time}}
						</view>
						<view class="name">
							{{item.name}}
						</view>
						<view class="equipmentNumber">
							{{item.gateName}}
						</view>
						<view class="status">
							{{item.content}}
						</view>
					</view>
					
					
				</view>
			
		</view>

		<!-- #endif -->
	</view>
</template>

<script>
	import uuid from '../units/net/uuid.js'
	export default {
		name: "indexMain",
		data() {
			return {
				identity: getApp().globalData.identity.includes('manager') ? 'manager' : 'worker',
				gateInfo:[
					{
						time:'2022-2-2',
						name:'张三',
						gateName:'一号入口',
						content:'进入隧道'
					},{
						time:'2022-2-3',
						name:'张三',
						gateName:'一号入口',
						content:'进入隧道'
					},
				],
				// 小程序
				//#ifdef MP
				assembly: [],

				//#endif

				// PC
				//#ifndef MP
				assembly: [{
					value: '/subPages_PC/addWorker/addWorker?page=0',
					label: "注册查看",
					ruls: require("../static/采集盒列表.png")
				}, {
					value: '/subPages_PC/addWorker/addWorker?page=1',
					label: "人员录入",
					ruls: require("../static/注册灰色.png")
				}, {
					value: '/subPages_PC/registrationAudit/registrationAudit',
					label: "注册审核",
					ruls: require("../static/审核.png")
				}, {
					value: "/subPages_PC/attendancePC/attendancePC",
					label: "当日考勤",
					ruls: require("../static/考勤.png")
				}, {
					value: "/subPages_PC/workerView/workerView",
					label: "人员总览",
					ruls: require("../static/预设人员.png")
				}, {
					value: "/subPages_PC/operationTicket/operationTicket",
					label: "操作票",
					ruls: require("../static/操作票.png")
				}, {
					value: '/subPages_PC/equipmentManage/equipmentManage',
					label: "设备处理",
					ruls: require("../static/设备状态.png")
				}],
				//#endif
				

			};
		},
	
		mounted() {
			
			//#ifdef MP
			this.setAssembly()
			//#endif
		},
		methods: {
			uuid(){
				return uuid()
			},
			triggerAlarm() {
				uni.showModal({
					title: '一键报警',
					content: '确认报警？',
					confirmText: '报警',
					confirmColor: '#ff0000',
					success(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				})
			},
			setAssembly() {
				if (getApp().globalData.identity.includes('manager')) {
					
					this.assembly.push(...[{
						value: '/subPages1_WX/registrationAudit/registrationAudit?page=0',
						label: "注册查看",
						ruls: require("../static/采集盒列表.png")
					}, {
						value: "/subPages1_WX/attendance/attendance",
						label: "当日考勤",
						ruls: require("../static/考勤.png")
					}, {
						value: "/subPages1_WX/attendanceView/attendanceView",
						label: "考勤总览",
						ruls: require("../static/考勤.png")
					}, {
						value: "/subPages1_WX/operationTicket/operationTicket",
						label: "操作票",
						ruls: require("../static/操作票.png")
					}, {
						value: '/subPages1_WX/addWorker/addWorker',
						label: "人员录入",
						ruls: require("../static/注册灰色.png")
					}])                 
				} 
				if(getApp().globalData.identity.includes('worker'))
				{
					this.assembly.push(...[{
						value: '/subPages1_WX/timingRecords/timingRecords',
						label: "打卡记录",
						ruls: require("../static/注册灰色.png")
					}])
				}

			},
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
		/* #ifdef H5 */
		
		
		.alarmAndRecords {
			width: 90%;
			display: flex;
			justify-content: space-between;
			align-items:flex-start;
			margin-top: 30rpx;
			height: 500rpx;
			.alarm {
				width: 40%;
				height: 100%;
				background-color: $uni-bg-color;
				border-radius: 10px;
				box-shadow: 3px 3px 7px 7px #eee;
				text-align: center;
				padding: 40rpx;
				box-sizing: border-box;
				.image {
					width: 80%;
					height: 80%;
				}
				.text {
					display: block;
					font-size: 60rpx;
					color: $uni-color-warning;
				}
			}
			.records {
				width: 50%;
				.record {
					background-color: $uni-bg-color;
					border-radius: 10px;
					box-shadow: 3px 3px 7px 7px #eee;
					font-size: 30rpx;
					padding: 30rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					.status {
						color: $uni-color-success;
					}
				}
			}
		}
		/* #endif */
		.abilitis::-webkit-scrollbar {
			width: 0 !important
		}

		.abilitis {
			background-color: $uni-bg-color;
			display: flex;
			justify-content: space-around;
			align-items: center;
			flex-wrap: wrap;
			box-sizing: border-box;
			//#ifdef MP
			justify-content: flex-start;
			width: 673rpx;
			//#endif
			width: 90vw;
			border-radius: 10px;
			box-shadow: 3px 3px 7px 7px #eee;
			padding-bottom: 40rpx;
			max-height: 300rpx;
			overflow: scroll;
			padding: 20rpx;

			.ability {
				display: flex;
				flex-direction: column;
				align-items: center;
				// height: 160rpx;
				width: 200rpx;

				//#ifdef MP
				height: 100rpx;
				width: 155rpx;
				margin-bottom: 20rpx;
				//#endif
				border-radius: 50%;
				position: relative;
				cursor: pointer;

				.img {
					//#ifdef MP
					width: 100rpx;
					height: 60rpx;
					//#endif
					width: 150rpx;
					height: 80rpx;
				}

				.title {
					width: 140rpx;
					margin-top: 10rpx;
					text-align: center;

					.text {
						font-size: 25rpx;
					}
				}

			}
		}

		.boxs {
			margin-top: 40rpx;
			height: 600rpx;
			width: 90%;

			.records {
				width: 100%;
				.record {
					background-color: $uni-bg-color;
					border-radius: 10px;
					box-shadow: 3px 3px 7px 7px #eee;
					font-size: 30rpx;
					padding: 30rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20rpx;
					.status {
						color: $uni-color-success;
					}
				}
			}

			.box {
				height: 100rpx;
				margin-bottom: 20rpx;
				background-color: $uni-bg-color;
				border-radius: 10px;
				box-shadow: 3px 3px 7px 7px #eee;
			}

			.top {
				height: 80rpx;
				font-size: 35rpx;
				margin: 10rpx auto;
				border-bottom: 2px solid #eee;
				width: 30%;
				text-align: center;
				line-height: 80rpx;
			}
		}

	}

	.img {

		width: 100rpx;
		height: 100rpx;
	}
</style>
