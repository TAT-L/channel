<template>
	<view class="content">

		<!-- #ifdef MP -->
		<view class="top">
			<!-- 微信扫码 -->
			<view class="alarm" @click="triggerAlarm">
				一键报警
			</view>
			//日志查看
			<uni-icons type="circle-filled" size="25" v-if="identity === 'manager'" @click="goLogPage"></uni-icons>
			<view class="QRcode" @click="scanQRcode">
				<uni-icons type="scan" size="23"></uni-icons>
			</view>


		</view>
		<!-- #endif -->



		<!-- 主页面组件 -->
		<index-main class="indexMain" @jump="jump"></index-main>

	</view>
</template>

<script>
	let identity = getApp().globalData.identity.includes('manager') ? 'manager' : 'worker'
	import indexMain from '../../components/indexMain.vue'
	import {
		scanQRcode
	} from '../../models/baseModel.js'
	import {
		confirmPcLogin
	} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				title: 'Hello',
				current: 0,
				items: ["首页", "个人"],
				identity:identity
			}
		},
		
		components: {
			indexMain
		},
		onLoad() {

		},
		methods: {
			goLogPage(){
				uni.navigateTo({
					url:'../log/log'
				})
			},
			triggerAlarm() {
				uni.showModal({
					title: '一键报警',
					content: '是否确认报警？',
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
			onClickItem(e) {
				this.current = e.currentIndex

			},
			scanQRcode() {
				//扫描二维码
				uni.scanCode({
					success: function(QRcode) {
						//上传二维码信息
						scanQRcode(QRcode.result).then(res => {
							console.log(res)
							//判断是否扫描成功
							if (res.data.detail.status === 1) {
								uni.showModal({
									title: "扫描成功",
									content: "是否确认登陆",
									success: (res) => {
										if (res.confirm) {
											console.log('用户点击确定');
											//点击确认，PC端登陆成功
											confirmPcLogin(QRcode.result).then(res => {
												console.log(res)
											})
										} else if (res.cancel) {
											console.log('用户点击取消');
										}
									}
								})
							} else if (res.data.detail.status === -1) {
								uni.showModal({
									title: "扫描失败",
									content: "二维码已失效",
								})
							} else if (res.data.detail.status === -2) {
								uni.showModal({
									title: "扫描失败",
									content: "二维码已使用",
								})
							}

						})
						console.log('条码类型：' + res.scanType);
						console.log('条码内容：' + res.result);
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;

		.indexMain {}
	}

	.tabBar {
		width: 90%;
		margin: 40rpx auto;
	}

	.top {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		width: 100%;
		height: 70rpx;
		text-align: right;
		background-color: #eee;

		.alarm {
			padding: 10rpx;
			border-radius: 10rpx;
			background-color: $uni-bg-color;
			font-size: 30rpx;
			color: $uni-color-error;

		}

		.QRcode {
			width: 50rpx;
			height: 50rpx;
			// border: 2px solid #000000;
			display: inline-block;
			margin: 20rpx 40rpx;
		}
	}
</style>
