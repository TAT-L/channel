<template>
	<view class="page">
		<view class="tips" v-if="status === 1">
			<text>注册成功，请等待管理员审核</text>
		</view>
		<view class="name">
			<label>姓名：</label>
			<input class="nameInput input" type="text" v-model="userName" />
		</view>
		<view class="phoneNumber">
			<label>电话：</label>
			<input class="phoneNumberInput input" type="text" v-model="userPhoneNumber" />
		</view>
		<button  class="registerButton" type="default" @click="register">注册</button>
	</view>
</template>

<script>
	import {registerApi} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				userName:'李贤杰',
				userPhoneNumber:'18786684382',
				status: uni.getStorageSync('status')
			};
		},
		methods:{
			register(){
				registerApi(
					{
						name:this.userName,
						phone:this.userPhoneNumber
					}
				).then((res) => {
					console.log(res)
					// 注册成功弹窗
					if(res.statusCode === 200){
						uni.showModal({
						    title: '注册成功',
						    content: '请等待管理员审核',
						    success: (res) => {
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
		.tips {
			font-size: 40rpx;
			margin-bottom: 30rpx;
			color: $main-color;
		}
		.registerButton{
			margin-top: 100rpx;
			background-color: $main-color;
			color: $uni-text-color;
			width: 300rpx;
		}
		
	}
	.input {
		display: inline-block;
		border: 1px solid $main-color;
		height: 50rpx;
	}
	.name {
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		.nameInput {
			
		}
		
	}
	.phoneNumber {
		display: flex;
		align-items: center;
	}
</style>