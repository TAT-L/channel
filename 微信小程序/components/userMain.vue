<template>
	<view class="page">
		<view class="userInformation">
			<view class="avatarBox">
				<image class="avatar" :src="avartar" mode="aspectFill"></image>
				<button size="mini" type="default" class="changeAvatarButton" @click="changeAvatar">修改</button>
			</view>
			<view class="otherBox">
				<view class="name">
					{{name}}
				</view>
				<view class="age">
					年龄：{{age}}
				</view>
				<view class="birthday">
					生日：{{birthday}}
				</view>

			</view>
			<uni-icons class="rightIcon" type="right" size="30" @click="goUserInfoPage"></uni-icons>
		</view>
		<view class="box">

		</view>
	</view>
</template>

<script>
	import {
		pathToBase64,
		base64ToPath
	} from 'image-tools'
	import {
		postAvatar,
		getAvatar
	} from '../models/userModel.js'
	export default {
		name: "userMain",
		data() {
			return {
				avartar: '',
				name: "小张",
				age: '23',
				birthday: '2000.1.1'
			};
		},
		mounted() {

			getAvatar().then(res => {
				this.avartar = res.data.detail.user.face
			})
		},
		methods: {
			goUserInfoPage(){
				
				uni.navigateTo({
					url:'/subPage3/userInfoEdit/userInfoEdit',
					success() {
						
					}
				})
			},
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						//压缩图片
						uni.compressImage({
							src: tempFilePaths[0],
							quality: 50,
							success: res => {
								console.log(res.tempFilePath)
								// 转Base64
								pathToBase64(res.tempFilePath)
									.then(base64 => {
										console.log(base64)

										// 上传头像
										postAvatar({
											face: base64
										}).then(res => {
											console.log(res)
											// 获取头像
											getAvatar().then(res => {
												this.avartar = res.data.detail
													.user.face
												console.log(res)
											})
											// this.avartar = res.data.detail.face
										})

									})
									.catch(error => {
										console.error(error)
									})
							}
						})

					}
				});
			}
		}

	}
</script>

<style lang="scss" scoped>
	.page {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: $uni-bg-color-grey;
		padding: 50rpx 40rpx;

		.userInformation {
			display: flex;
			justify-content: center;
			background-color: $uni-bg-color;
			height: 25%;
			width: 90%;
			border-radius: 10px;
			box-shadow: 3px 3px 7px 7px #eee;
			padding: 10rpx;
			position: relative;
			.avatarBox {
				display: flex;
				flex: 2;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				border: 1px solid $uni-border-color;

				.avatar {
					height: 200rpx;
					width: 200rpx;
					border-radius: 100%;
				}

				.changeAvatarButton {
					margin-top: 10rpx;
					width: 170rpx;
					background-color: $main-color;
					color: $uni-text-color;
				}
			}

			.otherBox {
				margin: 30rpx 60rpx;
				flex: 5;
				

				.name {
					font-size: 80rpx;
				}

				.age {
					margin-top: 20rpx;
				}

			}

			.rightIcon {
				position: absolute;
				// display: inline-block;
				bottom: 30rpx;
				right: 20rpx;
			}
		}

		.box {
			margin-top: 30rpx;
			width: 90%;
			height: 70%;
			background-color: $uni-bg-color;
			border-radius: 10px;
			box-shadow: 3px 3px 7px 7px #eee;
		}
	}
</style>
