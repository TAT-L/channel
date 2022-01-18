<template>
	<view class="box">

		<view class="Warehousing">
			<view class="title marTop">
				注册查看
			</view>
			<view class="table">
				<el-table :data="tableData" stripe style="width: 100%">
					<el-table-column prop="name" label="姓名" :width="width">
					</el-table-column>
					<el-table-column prop="phone" label="电话" :width="width">
					</el-table-column>
					<el-table-column prop="register_time" label="注册时间" :width="width">
					</el-table-column>
					<el-table-column fixed="right" label="操作">
						<template slot-scope="scope">
							<el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
			</view>
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
	export default {
		name: "WarehouseList",
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
			invitationList()
				.then(res => {
					console.log(res)
					res.data.detail.invitations.forEach(x => {
						if (x.register_time.length < 1) {
							x.register_time = "未注册"
						}
					})
					this.tableData = res.data.detail.invitations
				})
				.catch(err => {
					console.log(err)
				})
		},
		data() {
			return {
				width: 0,
				tableData: [{
					name: "1111",
					phone: "8888"
				}],
				flag: true,
				loading: true,
				page: 0
			};
		},
		methods: {
			handleClick(e) {
				console.log(e)
				this.$emit("reLoad", true);
				invitationRemove({
						id: e.id
					})
					.then(res => {
						console.log(res)
						this.$emit("reLoad", false);
						this.$message({
							message: '提交成功',
							type: "success"
						})
						invitationList()
							.then(res => {
								console.log(res)
								res.data.detail.invitations.forEach(x => {
									if (x.register_time.length < 1) {
										x.register_time = "未注册"
									}
								})
								this.tableData = res.data.detail.invitations
							})
							.catch(err => {
								console.log(err)
							})
					})
					.catch(err => {
						this.$emit("reLoad", false);
						console.log(err)
					})
			}
		},
	}
</script>

<style>
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
