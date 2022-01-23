<template>
	<view class="content">
		<view class="box">

			<view class="Warehousing">
				<view class="title marTop">
					员工总览模块
				</view>
				<view class="table">
					<el-table :data="tableData" stripe style="width: 100%">
						<el-table-column prop="name" label="姓名" :width="width">
						</el-table-column>
						<el-table-column prop="phone" label="电话" :width="width">
						</el-table-column>
						<el-table-column prop="checked_at" label="通过时间" :width="width">
						</el-table-column>
						<el-table-column prop="registered_at" label="注册时间" :width="width">
						</el-table-column>
<!-- 						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button @click="agree(scope.row)" type="text" size="small">同意</el-button>
								<el-button @click="refuse(scope.row)" type="text" size="small">拒绝</el-button>
							</template>
						</el-table-column> -->
					</el-table>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		registerCheckedList
	} from '../../models/baseModel.js'
	export default {
		mounted() {
			let obj = uni.createSelectorQuery().select('.table');
			obj.boundingClientRect(function(data) {
				console.log('元素信息：', data)
				console.log(data.width)
				this.width = data.width / 4
				console.log(this.width)
			}).exec()
		},
		created() {
			console.log("ssss")
			registerCheckedList()
				.then(res => {
					console.log(res.data.detail.users)
					this.tableData=res.data.detail.users
					// res.data.detail.invitations.forEach(x => {
					// 	if (x.register_time.length < 1) {
					// 		x.register_time = "未注册"
					// 	}
					// })
					// this.tableData = res.data.detail.invitations
				})
				.catch(err => {
					console.log(err)
				})
		},
		data() {
			return {
				width: 0,
				tableData: [],
				flag: true,
				loading: true,
				page: 0
			};
		},
		methods: {
			agree(e) {
				console.log(e)
				// invitationRemove({
				// 		id: e.id
				// 	})
				// 	.then(res => {
				// 		console.log(res)
				// 		this.$emit("reLoad", false);
				// 		this.$message({
				// 			message: '提交成功',
				// 			type: "success"
				// 		})
				// 		invitationList()
				// 			.then(res => {
				// 				console.log(res)
				// 				res.data.detail.invitations.forEach(x => {
				// 					if (x.register_time.length < 1) {
				// 						x.register_time = "未注册"
				// 					}
				// 				})
				// 				this.tableData = res.data.detail.invitations
				// 			})
				// 			.catch(err => {
				// 				console.log(err)
				// 			})
				// 	})
				// 	.catch(err => {
				// 		this.$emit("reLoad", false);
				// 		console.log(err)
				// 	})
			},
			refuse(e){
				console.log(e)
			}
		},
	}
</script>

<style>
    .content {
		display: flex;
		/* flex-direction: column; */
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}

	.title {
		text-align: center;
		font-weight: 900;
		font-size: 60rpx;
	}

	.marTop {
		margin-top: 20rpx;
	}

	.box {
		margin-top: 60rpx;
		width: 80%;
		display: flex;
	}


	.Warehousing {
		flex: 2;
		border: 1px solid #c5c5c5;
		box-sizing: border-box;
		box-shadow: 1px 2px 8px #C8CBC8;
		/* padding: 20rpx  40rpx; */
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-top: 20rpx;
		position: relative;
		min-height: 1200rpx;
	}


	.button {
		display: flex;
		justify-content: center;
	}

	/deep/ .el-button--small {
		font-size: 30rpx;
	}
</style>
</style>
