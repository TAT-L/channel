<template>
	<view class="content">

		<!-- #ifdef MP -->
		<view class="top">
			<!-- 微信扫码 -->
			<uni-icons type="circle-filled" size="25"></uni-icons>
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
				items: ["首页", "个人"]
			}
		},
		components: {
			indexMain
		},
		onLoad() {

		},
		methods: {
			jump(e){
				console.log(e)
				uni.navigateTo({
				    url: e
				});
			},
			onClickItem(e) {
				this.current = e.currentIndex
				if (e.currentIndex == 1) {
					console.log("333")
					uni.switchTab({
						url: '../user/user'
					})
				}
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
		width: 100%;
		height: 70rpx;
		text-align: right;
		background-color: #eee;

		.QRcode {
			width: 50rpx;
			height: 50rpx;
			// border: 2px solid #000000;
			display: inline-block;
			margin: 20rpx 40rpx;
		}
	}
</style>
