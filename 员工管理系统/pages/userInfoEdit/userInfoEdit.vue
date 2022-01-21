<template>
	<view class="page">
		<view class="title">
			<text>个人信息编辑</text>
		</view>

		<!-- 填写的信息 -->
		<view class="information ">
			<!-- 名字 -->
			<view class="box name" >
				<label for="name" class="label">姓名：</label>
				<input  class="input" type="text" value="" id="name"
					placeholder="填写真实姓名" confirm-type="next" cursor-spacing=100 confirm-hold=true maxlength="12"
					v-model="userInfo.name" />
			</view>

			<!-- 性别 -->
			<!-- <view class="sex box">
				<label class="label">性别：</label>
				
				<picker @change="sexChange" :range="sexPick" class="input">
					<view class="uni-input">{{sexPick[sexIndex]}}</view>
				</picker>
			</view> -->
			<!-- 电话 -->
			<view class="phoneNumber box" >
				<label for="phoneNumber" class="label">电话：</label>
				<input  class="input" type="digit" value="" id="phoneNumber"
					cursor-spacing=100 confirm-type="next" v-model="userInfo.phone" placeholder="请填写你的电话" />
			</view>
			<view class="note" v-if="warning!=''">{{warning}}</view>
			<button type="default" class="save" hover-class="save_hover" @click="changeWorkerInfo">保存</button>

		</view>

	</view>
</template>

<script>
	import {
		postWorkerInfo
	} from '../../models/userModel.js'
	var avatarImage = ''
	export default {
		components: {
			// schoolPicker,
			// editImage
		},
		data() {
			return {
				// 用户信息
				userInfo: {
					phone: '',
					name: ''
				},
			
				focusID: 'name',
				// 性别选择器
				sexPick: ['男', '女'],
				sexIndex: 0,
				warning: ''
			};
		},

		onLoad(res) {
			const eventChannel = this.getOpenerEventChannel();
			eventChannel.on('userInfo', (data) => {
				this.userInfo = data
			})
		},
		onUnload() {
			uni.$off('userInfo')
			uni.$off('backBase64')
		},

		methods: {
			changeWorkerInfo() {
				let phoneReg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/ //电话正则
				let nicenameReg = /^[\u4e00-\u9fa5]{2,6}$/ //昵称规定为1到八位
				if (!nicenameReg.test(this.userInfo.name)) {
					this.warning = '请输入2-6位姓名！'
				} else if (!phoneReg.test(this.userInfo.phone)) {
					this.warning = '电话格式错误！'
				} else {
					this.warning = ''
					delete this.userInfo.avatarUrl
					console.log(this.userInfo)
					postWorkerInfo(this.userInfo).then((postWorkerInfoRes) => {
						uni.$emit('refreshUserInfo',true)
						uni.navigateBack({
						})
					})
					


				}

			},



			// 上传保存信息
			postInfo() {


			}



		},
		watch: {

		}
	}
</script>

<style lang="scss">
	.note {
		color: red;
		text-align: center;
		margin-top: 30rpx;
		font-size: 30rpx;
	}

	.page {
		background-color: #FFF;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding-bottom: 300rpx;

		.title {
			margin-top: 20rpx;

		}

		.information {

			.box {
				box-sizing: border-box;
				width: 650rpx;
				background-color: #fff;
				border-radius: 10rpx;
				margin-top: 40rpx;
				display: flex;
				align-items: center;
				justify-content: space-around;
				padding: 20rpx 30rpx;
				box-shadow: 3px 3px 5px 3px #eee;
				z-index: 1;
			}

			.label {
				width: 20%;
			}

			.input {
				display: inline-block;
				width: 80%;
				height: 80%;

			}



			.volAccount {
				.label {
					width: 30%;
				}
			}


			.save {
				margin-top: 50rpx;
				background-color: $main-color;
				color: $uni-text-color;
			}

			.save_hover {
				background-color: #eee;
			}
		}

		// 获得焦点样式改变
		.getFocus {
			// border: 1px solid orange;
			// transform: scale(1.04);
			// transition: all 0.1s;

		}
	}
</style>
