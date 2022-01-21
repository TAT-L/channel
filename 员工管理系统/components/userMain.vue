<template>
	<view class="page">
		<view class="userInformation">
			<view class="avatarBox">
				<image class="avatar" :src="userInfo.avatarUrl" mode="aspectFill"></image>
				<button size="mini" type="default" class="changeAvatarButton" @click="changeAvatar">修改</button>
			</view>
			<view class="otherBox">
				<view class="name">
					{{userInfo.name}}
				</view>
				<!-- <view class="age">
					年龄：{{age}}
				</view>
				<view class="birthday">
					工号：{{birthday}}
				</view> -->

			</view>
			<uni-icons class="rightIcon" type="right" size="30" @click="goUserInfoPage"></uni-icons>
		</view>
		<!-- 工人打卡记录 -->
		<!-- #ifdef MP -->
		<view class="boxs" v-if="identity === 'worker'">
			<view class="records">
				<view class="record box" v-for="item in gateInfo" :key="uuid()">
					<view class="time">
						{{item.time}}
					</view>
					<!-- <view class="equipmentNumber">
					{{item.gateName}}
				</view> -->
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
	import {
		postAvatar,
		getAvatar
	} from '../models/userModel.js'
	export default {
		name: "userMain",
		data() {
			return {
				identity: getApp().globalData.identity.includes('manager') ? 'manager' : 'worker',
				// avartar: '',
				name: "小张",
				gateInfo: [{
					time: '2022-2-2',
					name: '张三',
					gateName: '一号入口',
					content: '打卡成功'
				}, {
					time: '2022-2-3',
					name: '张三',
					gateName: '一号入口',
					content: '打卡成功'
				}, ],
			};
		},
		props: ['userInfo'],
		mounted() {
			
			this.getAvatar()
		},
		methods: {
			uuid() {
				return uuid()
			},
			goUserInfoPage() {
				let userInfo = this.userInfo
				uni.navigateTo({
					url: '/pages/userInfoEdit/userInfoEdit',
					// events:{
					// 	fresh(res) => {
					// 		if(res){
								
					// 		}
					// 	}
					// },
					success(res) {
						console.log(userInfo)
						res.eventChannel.emit('userInfo', userInfo)
						uni.$emit('userInfo', userInfo)
					}
				})
			},
			getAvatar() {
				getAvatar().then(res => {
					this.userInfo.avatarUrl = res.data.detail.worker.face
					// console.log('touxiang', res)
				})
			},
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						//压缩图片
						// uni.compressImage({
						// 	src: tempFilePaths[0],
						// 	quality: 50,
						// 	success: compressImageRes => {
						// 		const tempFilePaths = chooseImageRes.tempFilePaths;
						// 		console.log('compressImageRes',tempFilePaths)
						uni.uploadFile({
							url: 'https://static.torchcqs.cn/upload',
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {},
							success: (uploadFileRes) => {
								let avatarUrl = JSON.parse(uploadFileRes.data).detail.file.path
								postAvatar({
									face: avatarUrl
								}).then(res => {
									console.log(res)
									// 获取头像
									this.getAvatar()
								})

							},
							fail(res) {
								console.log(res)
							}
						});


						// }
						// })

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

		.boxs {
			margin-top: 40rpx;
			height: 600rpx;
			width: 90%;
			padding: 10rpx;

			.records {
				width: 100%;

				.record {
					width: 100%;
					box-sizing: border-box;
					font-size: 30rpx;
					padding: 0rpx 20rpx;
					display: flex;
					justify-content: space-between;
					align-items: center;

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
		}

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
