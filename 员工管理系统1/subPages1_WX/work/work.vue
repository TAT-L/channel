<template>
	<view class="content">
		<view class="text">
			<text>操作票处理</text>
		</view>
		<view class="button">
			<button type="default" class="btn" @click="create">新建</button>
		</view>
		<view class="page">
			<tab :tableData="data" :title="title" :headers="headers" :name="name"></tab>
		</view>
	</view>
</template>

<script>
	// import {invitationAppend} from '../../models/baseModel.js'
	import tab from '../../components/tab.vue'
	import {
		ticketList
	} from '../../models/baseModel.js'
	export default {
		data() {
			return {
				data: [],
				headers: [90, 90, 20, 90, 20],
				title: ["创建时间", "开始时间", "操作票类型", "截止时间", "操作"],
				name: ["created_at", "start_time", "rule", "end_time"]
			}
		},
		components: {
			tab
		},
		onLoad() {
			ticketList()
		 	.then(res => {
					console.log(res.data.detail.tickets)
					let data = res.data.detail.tickets
                    if(data){
						for (let i = 0; i < data.length; i++) {
							data[i].created_at = data[i].created_at.split(' ')[0]
							data[i].start_time = data[i].created_at.split(' ')[0]
							if(data[i].end_time.length>3){
								data[i].end_time = data[i].created_at.split(' ')[0]
							}
						}
					}
					this.data = data
				})
		},
		methods: {
			create() {
				uni.redirectTo({
				    url: '/pages/increase/increase'
				});
			}
		}

	}
</script>

<style lang="scss">
	.view {
		border: 1px solid $main-color;
		// height: 50rpx;
		border-radius: 20rpx;
	}

	.input {
		// display: inline-block;
		border: none;
		padding: 10rpx 10rpx;
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

	.text {
		display: flex;
		font-weight: 600;
		align-items: center;
		justify-content: center;
		padding: 20rpx 40rpx;
		font-size: 42rpx;
	}

	.button {
		width: 80%;
		margin-left: 10%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding: 20rpx 20rpx;
		border-bottom: 1rpx solid #8F939C;
	}

	.btn {
		margin: 0 !important;
		width: 100rpx !important;
		padding-left: 0;
		padding-right: 0;
		font-size: 25rpx;
		border-color: #409EFF;
		padding: none !important;
		background-color: #409eff !important;
		color: #FFFFFF !important;
		border-radius: 20rpx;
	}
</style>
