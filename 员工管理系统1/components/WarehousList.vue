<template>
	<view class="content">
		<view class="text">
			<text>注册查看</text>
		</view>
		<view class="page">
			<!-- <table :tableData="data"></table> -->
			<tab @back="back" :tableData="data" :title="title" :headers="headers" :name="name"><button type="default" class="btn"
					>删除</button></tab>
		</view>
	</view>
</template>

<script>
	import {
		invitationList
	} from '../models/baseModel.js'
	import {
		invitationRemove
	} from '../models/baseModel.js'
	import tab from './tab.vue'
	export default {
		data() {
			return {
				data: [],
				headers: [80, 100, 100, 30],
				title: ["姓名", "电话", "注册时间", "设置"],
				name: ["name", "phone", "register_time"]
			}
		},
		onLoad() {
			console.log("开始了")
			invitationList()
				.then(res => {
					console.log(res)
				})
				.catch(err => {
					console.log(err, 11)
				})
		},
		created() {
			console.log("开始了")
            this.List()
		},
		methods: {
			back(e) {
				console.log(e)
				invitationRemove({
						id: e.id
					})
					.then(res=>{
						console.log(res)
						this.List()
					})
					.catch(err=>{
						console.log(err)
					})
			},
			List(){
				invitationList()
					.then(res => {
						console.log(res.data.detail.invitations)
						let data = res.data.detail.invitations
						for (let i = 0; i < data.length; i++) {
							if (data[i].register_time.length == 0) {
								console.log(data[i].register_time.length)
								data[i].register_time = "未注册"
							}
						}
						console.log(data)
						this.data = data
					})
					.catch(err => {
						console.log(err, 11)
					})
			}
		},
		components: {
			tab
		}
	}
</script>

<style lang="scss">
	.page {
		// margin-top: 15vh;
		// height: 50vh;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
	}

	.view {
		border: 1px solid $main-color;
		// height: 50rpx;
		border-radius: 20rpx;
	}

	.text {
		display: flex;
		font-weight: 600;
		align-items: center;
		justify-content: center;
		padding: 20rpx 40rpx;
		font-size: 42rpx;
	}

	.table {
		width: 94%;

		/* background-color: palegoldenrod; */
		margin-top: 20rpx;
	}

	/* .table {
	  border: 1px solid #dadada;
	} */

	.tr {
		background: rgba(255, 255, 255, 100);
		display: flex;
		width: 100%;
		justify-content: center;
		height: 3rem;
		align-items: center;
		font-size: 32rpx;
	}

	.td {
		width: 40%;
		justify-content: center;
		text-align: center;
		border-bottom: 1px solid #666565;
		border-right: 1px solid #666565;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.th {
		width: 40%;
		justify-content: center;
		background: rgba(255, 255, 255, 100);
		color: black;
		display: flex;
		height: 3rem;
		align-items: center;
		border-bottom: 1px solid #666565;
		border-right: 1px solid #666565;
		border-top: 1px solid #666565;
		font-size: 32rpx;
		font-weight: 800;
	}

	.mytd {
		border-left: 1px solid #666565;
	}

	.s_table {
		display: inline-flex;
		flex-direction: column;
		border-bottom: 0;
		min-width: 100%;
		font-size: 30rpx;
	}

	.s_table-border {
		border: solid 2rpx #dfdfdf;
	}

	.s_table-header {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;
		font-weight: bold;
		background-color: #f3f0f0;
	}

	.s_table-header-column {
		padding: 6rpx 10rpx;
		flex-shrink: 0;
		word-break: break-all;
		word-wrap: break-word;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.last-column {
		flex-grow: 1;
	}

	.s_table-header-column-border {
		border-right: solid 2rpx #dfdfdf;
	}

	.s_table-header-column-border:last-child {
		border-right: solid 0rpx #dfdfdf;
	}

	.s_table-content-row {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		align-items: stretch;
	}

	.s_table-row-white {
		background-color: #ffffff;
	}

	.s_table-row-gray {
		background-color: #efefef;
	}

	.s_table-content-column {
		padding: 6rpx 10rpx;
		flex-shrink: 0;
		word-break: break-all;
		word-wrap: break-word;
		overflow: hidden;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.s_table-content-column-border {
		border-top: solid 2rpx #dfdfdf;
		border-right: solid 2rpx #dfdfdf;
	}

	.s_table-content-column-border:last-child {
		border-right: solid 0rpx #dfdfdf;
	}

	.nodata {
		text-align: center;
		padding: 30rpx;
		color: #999;
	}

	.btn {
		margin: 0 !important;
		width: 100rpx !important;
		padding-left: 0;
		padding-right: 0;
		font-size: 25rpx;
		border: none !important;
		padding: none !important;
		background-color: #E43D33 !important;
		color: #FFFFFF !important;
	}
</style>
