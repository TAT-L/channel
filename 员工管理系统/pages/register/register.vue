<template>
	<view class="page">
		<view class="tips" v-if="status === 1">
			<text>注册成功，请等待管理员审核</text>
		</view>
		<view class="form" v-if="status != 1">
			<view class="name box">
				<label>姓名：</label>
				<input class="nameInput input" type="text" v-model="userName" />
			</view>
			<view class="phoneNumber box">
				<label>电话：</label>
				<input class="phoneNumberInput input" type="text" v-model="userPhoneNumber" />
			</view>
			<view class="picker box">
				<picker @change="pickerChange" :value="index" :range="managerList" range-key='name'>
					<view class="uni-input">{{managerList[index].name}}</view>
				</picker>
			</view>
			<button class="registerButton" type="default" @click="register">注册</button>
		</view>

	</view>
</template>

<script>
	import login from '../../units/login.js'
	import {getManagerList} from '../../models/baseModel.js'
	import {
		registerApi
	} from '../../models/baseModel.js'
	export default {
		data() {
			return {A
				userName: '',
				userPhoneNumber: '',
				status: uni.getStorageSync('status'),
				managerList:[{
					name:"请选择管理员",
					id:0
				}],
				index:0
			};
		},
		
		onPullDownRefresh() {
			login().then(res => {
				if (res.data.detail.status === 2) {
					console.log("审核通过，跳转至首页")
					uni.switchTab({
						url: '/pages/index/index'
					});
				}
			})
			setTimeout(() => {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		
		onLoad(){
			this.getManager()
			
		},
		methods: {
			pickerChange(index){
				this.index = index.detail.value
			},
			// 获取管理员列表
			getManager(){
				getManagerList()
				.then( (res) => {
					res.data.detail.managers.forEach((item) => {
						this.managerList.push(
						{
							name:item.user.name,
							id:item.id
						})
					})
					console.log(res)
				})
			},
			// 注册
			register() {
				registerApi({
					name: this.userName,
					phone: this.userPhoneNumber,
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
			padding: 10rpx 	;
			width: 100%;
		}
		.picker{
			
			background-color: #ffffff;
			text-align: center;
			line-height: 70rpx;
			
		}
		.tips {
			font-size: 40rpx;
			margin-bottom: 30rpx;
			color: $main-color;
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
