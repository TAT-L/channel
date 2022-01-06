<template>
	<view class="page">
		<view class="loginBox">
			<view class="tips">
				请打开小程序，扫描二维码登陆
			</view>
			<image class="QRcode" :src="QRcode" mode="aspectFill"></image>
			<view class="resultTips" v-if="QRcodeStatus">
				{{resultTipsContent}}
			</view>
		</view>
	</view>
</template>

<script>
	let QRcodeToken = ''
	import {pcLogin} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				QRcodeStatus:0,
				resultTipsContent :'',
				QRcode:''
			};
		},
		onLoad() {
			this.loadQRcode()
			
			
		},
		
		methods:{
			loadQRcode(){
				uni.request({
					url:'https://device.torchcqs.cn/api/login/qrcode',
					method:'GET',
					header:{
						'content-type':'application/json'
					},
					success: (res) => {
						console.log(res)
						this.QRcode = res.data.detail.qrcode
						QRcodeToken = res.data.detail.token
						this.checkQRcode()
					}
					
				})
			},
			checkQRcode(){
			const timer = setInterval(() => {
					console.log("检查二维码是否被扫描")
					pcLogin({
						token:QRcodeToken
					}).then(res => {
						console.log(res.data.detail.status)
						this.QRcodeStatus = res.data.detail.status
						if(res.data.detail.status === 2){
							clearInterval(timer)
							console.log("登陆成功")
							this.resultTipsContent = '登陆成功'
							uni.switchTab({
								url:'../../pages/index/index'
							})
						}else if(res.data.detail.status === 1){
							this.resultTipsContent = '请点击确认'
						}else if(res.data.detail.status === -1){
							this.resultTipsContent = '二维码已过期，请刷新'
							clearInterval(timer)
						}
					})
				},2000)
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
		.loginBox{
			display: flex;
			flex-direction: column;
			align-items: center;
			box-shadow: 3rpx 3rpx 10rpx 8rpx  #eee;
			border-radius: 10rpx;
			padding: 100rpx 100rpx;
		}
		.tips {
			color: $main-color;
		}
		.QRcode {
			margin: 40rpx;
			height: 400rpx;
			width: 400rpx;
		}
	}
</style>
