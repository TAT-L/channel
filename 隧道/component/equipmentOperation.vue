<template>
	<view class="  popup" v-loading="loading" element-loading-text="数据上传中" element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
		<view class="box">
			<el-transfer filterable filter-placeholder="请输入人名" v-model="user" :props="{
					      key: 'id',
					      label: 'description'
					    }" :titles="['待选名单', '已选名单']" :button-texts="['移除', '添加']" :data="workers" @change="change"
				@left-check-change="leftCheckChange" @right-check-change="rightCheckChange">
			</el-transfer>
			<view class="btn button">
				<el-button type="primary" round @click="back">返回</el-button>
			</view>
		</view>

		<!-- </el-tab-pane> -->
		<!-- </el-tabs> -->
	</view>
</template>
<script>
	import {
		workList
	} from '../models/baseModel.js'
	import {
		terminalDetail
	} from '../models/baseModel.js'
	import {
		terminalAppend
	} from '../models/baseModel.js'
	import {
		terminalRemove
	} from '../models/baseModel.js'
	export default {
		name: "operation",
		props: {
			flag: {
				type: Boolean,
				default: false
			},
			id: {
				type: String,
				default: ''
			}
		},
		created() {
			console.log("去去去")
			workList()
				.then(res => {
					if(res.data.detail.workers){
						console.log(res.data.detail.workers)
						console.log(this.workers)
						this.workers = res.data.detail.workers
					}
					
				})
				.catch(err => {
					console.log(err)
				})
			terminalDetail({
					sn: this.id
				})
				.then(res => {
					console.log(res)
					console.log(res.data.detail.workers[0].id)
					if (res.data.detail.workers) {
						for (let i = 0; i < res.data.detail.workers.length; i++) {
							this.user.push(res.data.detail.workers[i].id)
						}
					}


				})
				.catch(err => {
					console.log(err)
				})
		},
		data() {
			return {
				value: [],
				workers: [],
				checkedCities: [],
				show: false,
				activeName: 'first',
				user: [],
				leftData: [],
				rightData: [],
				loading: false
			};
		},
		methods: {
			back() {
				this.$emit("goBack", false);
			},
			change(e1, e2, e3) {
				console.log(e1)
				console.log(e2)
				console.log(e3)
				console.log(this.leftData)
				console.log(this.rightData)
				this.loading = true
				if (e2 == "right") {
					terminalAppend({
							sn: this.id,
							data: {
								workers: e3
							}
						})
						.then(res => {
							this.loading = false
						})
						.catch(err => {
							this.loading = false
							reData()
							this.$message({
								message: '服务器错误',
								type: "error"
								})
					})
				} else {
					terminalRemove({
							sn: this.id,
							data: {
								workers: e3
							}
						})
						.then(res => {
							this.loading = false
						})
						.catch(err => {
							this.loading = false
							reData()
							this.$message({
								message: '服务器错误',
								type: "error"
							})
						})
					console.log("left")
				}
			},
			leftCheckChange(e) {
				console.log(e)
				this.leftData = e
				console.log(this.user)
			},
			rightCheckChange(e) {
				this.rightData = e
				console.log(this.user)
			},
			// DataCange(data, index) {
			// 	for (let item in data) {
			// 		this.data[index].people.push(this.workers[item])
			// 	}
			// 	this.data[index].len = data.length
			// },
			handleClick(tab, event) {
				console.log(tab, event);
			},
		    reData(){
				 workList()
				 	.then(res => {
				 		console.log(res.data.detail.workers)
				 		console.log(this.workers)
				 		this.workers = res.data.detail.workers
				 	})
				 	.catch(err => {
				 		console.log(err)
				 	})
				 terminalDetail({
				 		sn: this.id
				 	})
				 	.then(res => {
				 		console.log(res.data.detail.users[0].id)
				 		if (res.data.detail.users) {
				 			for (let i = 0; i < res.data.detail.users.length; i++) {
				 				this.user.push(res.data.detail.users[i].id)
				 			}
				 		}
				 
				 
				 	})
				 	.catch(err => {
				 		console.log(err)
				 	})
			},
			btns() {
				let data = this.data
				let flag = true;
				for (let i = 0; i < data.length; i++) {
					let string = ''
					if (data[i].people.length == 0) {
						this.$message({
							message: data[i].name + '信息未填写完整',
							type: "error"
						})
						flag = false;
						break;
					}
					for (let j = 0; j < data[i].people.length; j++) {
						if (j != data[i].people.length - 1) {
							string += data[i].people[j] + "、"
						} else {
							string += data[i].people[j]
						}
					}
					data[i].strings = string
				}
				if (flag) {
					this.data = data
					this.show = true
				}
			}
		},
	}
</script>

<style>
	.box {
		/* width: 100%; */
		min-height: 80vh;
		/* margin-left: 10%; */
		border: 1px solid #999999;
		box-sizing: border-box;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		background: #fff;
		padding: 40rpx 100rpx;
	}

	.popup {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, .5);
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;

	}

	.marginTop {
		margin-top: 40rpx;
	}

	.margin {
		margin: 40rpx 0;
	}

	.title {
		text-align: center;
		font-weight: 900;
		font-size: 60rpx;
	}

	.el-checkbox {
		font-size: 40rpx;
	}

	.el-checkbox__input {
		font-size: 40rpx;
	}

	/deep/ .el-checkbox__label {
		font-size: 40rpx !important;
	}

	/* 	/deep/ .el-checkbox__inner{
		width: 40rpx;
		height: 40rpx;
	} */
	.operationItem {
		margin: 40rpx 10rpx;
		padding: 10rpx 20rpx;
		/* background-color: #000000; */
		/* border: 1px solid #409EFF; */
		box-shadow: 1px 2px 8px #C8CBC8;

	}

	.IiemBox {
		display: flex;
	}

	.itemUi {
		flex: 3;
		/* border: 1px solid black; */
		padding: 20rpx 20rpx;
	}

	.itemSum {
		flex: 1;
		/* border: 1px solid pink; */
		display: flex;
		align-items: center;
		justify-content: center;
	}

	/deep/ .el-popover {
		position: relative;
	}

	.itemData {
		font-size: 35rpx;
	}

	.button {
		display: flex;
		justify-content: space-around;
	}

	.btn {
		padding: 20rpx 40rpx;
		color: #000;
		/* background-color: #f8f8f8; */
		font-size: 36rpx;
		cursor: pointer;
	}

	/deep/ .el-transfer-panel__body {
		height: 800rpx;
	}

	/deep/ .el-transfer-panel__list.is-filterable {
		height: 800rpx;
	}

	/deep/ .el-tab-pane,
	/deep/.el-tabs__nav-scroll {
		display: flex;
		justify-content: center;
	}

	/deep/ .el-transfer-panel {
		width: 650rpx;
	}
</style>

