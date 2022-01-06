<template>
	<view class="box marginTop">
		<popup v-if="show" @back="back" :show="show"></popup>
		<operation v-if="flag" :id="whichId" @goBack="goBack"></operation>
		<view class="title">
			操作票处理
		</view>
		<view class="create">
			<el-button type="primary" round @click="create">新建</el-button>
		</view>
		<el-divider></el-divider>
		<view class="table">
			<el-table :data="tableData" border style="width: 100%">
				<el-table-column prop="created_at" label="创建时间" width="200">
				</el-table-column>
				<el-table-column prop="start_time" label="开始时间" width="200">
				</el-table-column>
				<el-table-column prop="end_time" label="截止时间" width="200">
				</el-table-column>
				<el-table-column prop="rule" label="操作票类型" width="200">
				</el-table-column>
				<el-table-column fixed="right" label="操作">
					<template slot-scope="scope">
						<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
					</template>
				</el-table-column>
			</el-table>
		</view>
	</view>
</template>

<script>
	import {
		ticketList
	} from '../models/baseModel.js'
	import popup from './popup.vue'
	import Time from '../units/net/time.js'
	import operation from './operation.vue'
	import work from '../models/work.js'
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
				this.whichId=row.id
				this.flag=true
			},
			create() {
				this.show = true
			}
		},
		created() {
			console.log(work["weekly"])
			// console.log(work.weekday())
			ticketList()
				.then(res => {
					console.log(res.data.detail.tickets)
					let data=res.data.detail.tickets
					for(let item in data){
						console.log(data[item])
						data[item].rule=work[data[item].rule]
					}
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
</style>
