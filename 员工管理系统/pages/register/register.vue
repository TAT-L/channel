<template>
	<view class="page">
		<view class="tips" v-if="status === 1">
			<text>注册成功，请等待管理员审核</text>
			<view class="">
				下拉刷新检验审核情况
			</view>
		</view>
		<view class="form" v-if="status != 1">
			<view class="name box">
				<label class="label">姓名：</label>
				<input class="nameInput input" type="text" v-model="userName" placeholder="请输入姓名" />
			</view>
			<view class="phoneNumber box">
				<label class="label">电话：</label>
				<input class="phoneNumberInput input" type="number" v-model="userPhoneNumber" placeholder="请输入电话" />
			</view>
			<!-- <view class="phoneNumber box">
				<label class="label">身份证：</label>
				<input class="phoneNumberInput input" type="idcard" v-model="IDNumber" placeholder="请输入身份证号" />
			</view> -->
			<view class="picker box">
				<picker @change="pickerChange" :value="index" :range="managerList" range-key='name'>
					<view class="uni-input">{{managerList[index].name}}</view>
				</picker>
			</view>
			<view class="tips regTip" v-if="error">
				{{error}}
			</view>
			<button class="registerButton" type="default" @click="register">注册</button>
		</view>

	</view>
</template>

<script>
	import login from '../../units/login.js'
	import {
		getManagerList
	} from '../../models/baseModel.js'
	import {
		registerApi
	} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				userName: '',
				userPhoneNumber: '',
				status: uni.getStorageSync('status'),
				IDNumber: '',
				error: '',
				managerList: [{
					name: "请选择管理员",
					id: 0
				}],
				index: 0
			};
		},

		onPullDownRefresh() {
			this.loginRegs()
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},

		onLoad() {
		
			this.loginRegs()
		},
		methods: {
			loginRegs() {
				login().then(res => {
					if (res.data.detail.status === 2) {
						console.log("审核通过，跳转至首页")
						uni.switchTab({
							url: `/pages/index/index`
						});
					} else {
						this.getManager()
					}
					
				})
			},
			pickerChange(index) {
				this.index = index.detail.value
			},
			// 获取管理员列表
			getManager() {
				getManagerList()
					.then((res) => {
						res.data.detail.managers.forEach((item) => {
							this.managerList.push({
								name: item.user.name,
								id: item.id
							})
						})
						console.log(res.data)
					})
			},
			// 注册
			register() {
				let regName = /^[\u4e00-\u9fa5]{2,6}$/
				let regPhoneNum = /^([1]\d{10}|([\(（]?0[0-9]{2,3}[）\)]?[-]?)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?)$/
				let regID18 =
					/^([1-6][1-9]|50)\d{4}(18|19|20)\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
				let regID15 = /^([1-6][1-9]|50)\d{4}\d{2}((0[1-9])|10|11|12)(([0-2][1-9])|10|20|30|31)\d{3}$/
				if(!regName.test(this.userName)){
					this.error = '请输入正确姓名!!!'
				}
				else if (!regPhoneNum.test(this.userPhoneNumber)) {
					this.error = '请输入正确的手机号!!!'
				} 
				// else if (!regID18.test(this.IDNumber) && !regID15.test(this.IDNumber)) {
				// 	this.error = '请输入正确的身份证!!!'
				// }
				else if(this.index <= 0){
					this.error = '请选择管理员!!!'
				} 
				else {
					registerApi({
						name: this.userName,
						phone: this.userPhoneNumber,
						// IDNumber: this.IDNumber,
						manager: this.managerList[this.index].id
					}).then((res) => {
						console.log(res)
						// 注册成功弹窗
						if (res.statusCode === 200) {
							uni.showModal({
								title: '注册成功',
								content: '请等待管理员审核',
								success: (res) => {
									this.status = 1
									if (res.confirm) {
										console.log('用户点击确定');
									} else if (res.cancel) {
										console.log('用户点击取消');
									}
								}
							});
						}
					})
				}

			}
		}
	}
</script>

<style lang="scss">
	.page {
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 40rpx 80rpx;
		background-color: #f5f5f5;

		.box {
			background-color: #FFFFFF;
			box-shadow: 3px 3px 3px #eee;
			margin-bottom: 30rpx;
			border-radius: 10rpx;
			height: 70rpx;
			padding: 10rpx;
			width: 100%;

			.label {
				width: 35%;
			}
		}

		.picker {

			background-color: #ffffff;
			text-align: center;
			line-height: 70rpx;

		}

		.tips {
			font-size: 40rpx;
			margin-bottom: 30rpx;
			color: $uni-color-error;
			text-align: center;
		}
		.regTip {
			font-size: 25rpx;
		}

		.registerButton {
			margin-top: 100rpx;
			background-color: $main-color;
			color: $uni-text-color;
			width: 300rpx;
		}

	}

	.input {
		display: inline-block;

	}

	.name {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;

		.nameInput {}

	}

	.phoneNumber {
		display: flex;
		align-items: center;
	}
</style>
