<template>
	<view class="i">
		<!-- <Warehousing></Warehousing> -->
		<WarehousList></WarehousList>
	</view>
</template>

<script>
	// import {invitationAppend} from '../../models/baseModel.js'
	import Warehousing from '../../models/Warehousing.vue'
	import WarehousList from '../../models/WarehousList.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				input:"",
				Name:'',
				PhoneNumber:''
			}
		},
		components:{
			Warehousing,
			WarehousList
		},
		onLoad() {

		},
		methods: {
          register(){
			  console.log(this.Name)
			  console.log(this.PhoneNumber)
			  let data=[{name:this.Name,phone:this.PhoneNumber}]
			  console.log(data)
			  // invitationAppend({
			  // 	users:data
			  // })
		  }
		}
	}
</script>

<style lang="scss">
	.page {
		// margin-top: 15vh;
		// height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content:space-around;
		align-items: center;
		.registerButton{
			margin-top: 100rpx;
			background-color: $main-color;
			color: $uni-text-color;
			width: 300rpx;
		}
		
	}
	.view{
		border: 1px solid $main-color;
		// height: 50rpx;
		border-radius: 20rpx;
	}
	.input {
		// display: inline-block;
		border:none;
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
	.text{
		display: flex;
		font-weight: 600;
		align-items: center;
		justify-content: center;
		padding: 20rpx 40rpx;
		font-size: 42rpx;
	}
</style>
