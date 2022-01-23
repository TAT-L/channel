<template>
	<view class="box">
		<view class="text">
			<text>人员录入系统</text>
		</view>
		<view class="page">
			<view class="name">
				<label>姓名：</label>
				<view class="inputView">
					<input class="nameInput input" type="text" v-model="userName" />
				</view>
			</view>
			<view class="phoneNumber">
				<label>电话：</label>
				<view class="inputView">
					<input class="phoneNumberInput input" type="text" v-model="userPhoneNumber" />
				</view>
			</view>
		</view>
		<view class="button">
			<button  class="registerButton btn" type="default" @click="register">录入</button>
		</view>
	</view>
</template>

<script>
	import {registerApi} from '../../models/baseModel.js'
	import {invitationAppend} from '../../models/baseModel.js'
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
                  invitationAppend({
                  	users:[{
						name:this.userName,
						phone:this.userPhoneNumber
					}]
                  })
				  .then(res=>{
					  console.log(res)
				  })
			}
		}
	}
</script>

<style lang="scss">
	.text {
		display: flex;
		font-weight: 600;
		align-items: center;
		justify-content: center;
		padding: 20rpx 40rpx;
		font-size: 42rpx;
	}
	.page {
		margin-top: 15vh;
		min-height: 20vh;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 40rpx 80rpx;	
	}
	.inputView{
		border: 1px solid $main-color;
		border-radius: 10rpx;
	}
	.input {
		display: inline-block;
		border: none;
		height: 20rpx;
		padding: 10rpx 10rpx;
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
	.btn {
		margin: 0 !important;
		width: 200rpx !important;
		padding-left: 0;
		padding-right: 0;
		font-size: 30rpx;
		border-color: #409EFF;
		padding: none !important;
		background-color: #409eff !important;
		color: #FFFFFF !important;
		border-radius: 20rpx;
	}
	.button{
		margin-top: 5vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
	}
</style>


