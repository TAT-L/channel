<template>
	<view>
		<view class="name">
			<label>姓名：</label>
			<input class="nameInput input" type="text" v-model="userName" />
		</view>
		<view class="phoneNumber">
			<label>电话：</label>
			<input class="phoneNumberInput input" type="text" v-model="userPhoneNumber" />
		</view>
		<button type="default" @click="register">注册</button>
	</view>
</template>

<script>
	import registerApi from '../../units/net/http.js'
	export default {
		data() {
			return {
				userName:'lixianjie',
				userPhoneNumber:'12345'
			};
		},
		methods:{
			register(){
				registerApi.post({
					url:'/user/register',
					data:{
						name:this.userName,
						phone:this.userPhoneNumber
					}
				}).then((res) => {
					console.log(res)
				})
			}
		}
	}
</script>

<style lang="scss">
	.input {
		display: inline-block;
		border: 1px solid #409EFF;
	}
	.name {
		.nameInput {
			
		}
	}
</style>
