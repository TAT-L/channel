<template>
	<view class="page">
		<view class="loginBox">
			<view class="tips">
				请打开小程序，扫描二维码登陆
			</view>
			<image class="QRcode" :src="QRcode" mode="aspectFill"></image>
			<view class="cover"  v-if="QRcodeStatus === -1">
				<view class="resultTips">
					{{resultTipsContent}}
				</view>
				<view class="" :animation="animationData" >
					<uni-icons type="refresh" size="40" color="#080808" @click="loadQRcode"></uni-icons>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	let QRcodeToken = ''
	let timer = null
	import {
		pcLogin
	} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				QRcodeStatus: 0,
				resultTipsContent: '二维码已过期，请刷新',
				QRcode: '',
				animationData: {},
				animation: ''
			};
		},
		onLoad() {
			let animation = uni.createAnimation({
				duration: 2000,
				 transformOrigin: "50% 0 50%",  
				timingFunction: 'ease',
				delay:200
			})
			this.animation = animation
			console.log("???", this.animation)

			this.loadQRcode()
		},


		methods: {
			loadQRcode() {
				// 动画
				this.animation.rotate(360).step()
				this.animation.rotate(-360).step({timingFunction:'step-end'})
				console.log(this.animation)
				this.animationData = this.animation.export()
				uni.request({
					url: 'https://device.torchcqs.cn/api/login/qrcode',
					method: 'GET',
					header: {
						'content-type': 'application/json'
					},
					success: (res) => {
						console.log(res)
						this.QRcode = res.data.detail.qrcode
						QRcodeToken = res.data.detail.token
						this.checkQRcode()
					}

				})
			},
			checkQRcode() {
				if (timer) {
					clearInterval(timer)
				}
				timer = setInterval(() => {
					console.log("检查二维码是否被扫描")
					uni.request({
						url: 'https://device.torchcqs.cn/api/login/qrcode/check',
						data: {
							token: QRcodeToken
						},
						method: 'POST',
						header: {
							'content-type': 'application/json'
						},
						success: (res) => {
							console.log(res.data.detail.status)
							this.QRcodeStatus = res.data.detail.status
							if (res.data.detail.status === 2) {
								clearInterval(timer)
								console.log("登陆成功")
								this.resultTipsContent = '登陆成功'
								uni.navigateTo({
									url: '../pcIndex/pcIndex'
								})
							} else if (res.data.detail.status === 1) {
								this.resultTipsContent = '请点击确认'
							} else if (res.data.detail.status === -1) {
								this.resultTipsContent = '二维码已过期，请刷新'
								clearInterval(timer)
							}

						},
						fail: (err) => {
							console.log(err)
						},
						complete: () => {}
					});

				}, 3000)
			}

		}

	}
</script>

<style lang="scss">
	.page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;

		.loginBox {
			position: relative;
			display: flex;
			flex-direction: column;
			align-items: center;
			box-shadow: 3rpx 3rpx 10rpx 8rpx #eee;
			border-radius: 10rpx;
			padding: 100rpx 100rpx;
		}

		.cover {
			margin: 70rpx;
			position: absolute;
			background-color: $uni-bg-color;
			height: 400rpx;
			width: 400rpx;
			opacity: .8;
			text-align: center;

			.resultTips {
				margin-top: 150rpx;
				color: red;
				font-size: 15px;
				font-weight: bold;
			}
		}


		.QRcode {
			margin: 40rpx;
			height: 400rpx;
			width: 400rpx;
		}
	}
</style>
