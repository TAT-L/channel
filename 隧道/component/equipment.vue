<template>
	<view class="box marginTop">
		<popup v-if="show" @back="back" :show="show"></popup>
		<operation v-if="flag" :id="whichId" @goBack="goBack"></operation>
		<view class="title">
			设备处理
		</view>
		<view class="create">
			<el-button type="primary" round @click="create">新建</el-button>
		</view>
		<el-divider></el-divider>
		<view class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="name" label="设备名" width="200">
				</el-table-column>
				<el-table-column class="red" prop="phone" label="在线状态" width="200">
					<template slot-scope="scope">
						<!-- <span style="margin-left: 10px">{{ scope.row }}</span> -->
						<i class="el-icon-success" v-if="scope.row.online"></i>
						<i class="el-icon-error" v-else></i>
					</template>
				</el-table-column>
				<el-table-column prop="sn" label="序列号" width="200">
				</el-table-column>
				<el-table-column prop="update_at" label="更新时间" width="200">
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
						<el-button @click="handleClick(scope.row)" type="text" size="small">添加</el-button>
						<el-button @click="delate(scope.row)" type="text" size="small">解绑</el-button>
					</template>
				</el-table-column>
			</el-table>
		</view>
	</view>
</template>

<script>
	import {
		terminalList
	} from '../models/baseModel.js'
	import Time from '../units/net/time.js'
	import popup from './terminalInput.vue'
	import operation from './equipmentOperation.vue'
	import {terminalUnbind} from '../models/baseModel.js'
	export default {
		components: {
			popup,
			operation
		},
		data() {
			return {
				show: false,
				flag:false,
				whichId:-1,
				tableData: [],
			}
		},
		methods: {
			back(e) {
				console.log(e)
				console.log(this.show)
				this.show = e
			},
			goBack(e){
				this.flag=e
			},
			handleClick(row) {
				console.log(row);
				this.whichId=row.sn
				this.flag=true
			},
			delate(row){
				terminalUnbind({
					sn:row.sn
				})
				.then(res=>{
					this.$message({
						message: '解绑成功',
						type: "success"
					})
					terminalList()
						.then(res => {
							console.log(res.data.detail.terminals)
							let data=res.data.detail.terminals
							// for(let item in data){
							// 	console.log(data[item])
							// 	data[item].rule=work[data[item].rule]
							// }
							this.tableData=data
						})
						.catch(err => {
							console.log(err)
						})
				})
			},
			create() {
				this.show = true
			}
		},
		created() {
			terminalList()
				.then(res => {
					console.log(res.data.detail.terminals)
					let data=res.data.detail.terminals
					// for(let item in data){
					// 	console.log(data[item])
					// 	data[item].rule=work[data[item].rule]
					// }
					this.tableData=data
				})
				.catch(err => {
					console.log(err)
				})
		}
	}
</script>

<style>
	.box {
		width: 80%;
		min-height: 80vh;
		margin-left: 10%;
		/* border: 1px solid #999999; */
		box-sizing: border-box;
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

	.create {
		width: 80%;
		margin-left: 10%;
		display: flex;
		justify-content: right;
		border: ;
	}

	/deep/ .el-divider--horizontal {
		margin: 16rpx 0;
	}

	.table {
		width: 80%;
		margin-left: 10%;
	}

	/deep/ .el-button--small {
		font-size: 30rpx;
	}
	/deep/ .el-icon-success {
		color: #67C23A;
	}
</style>