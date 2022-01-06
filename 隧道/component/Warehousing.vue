<template>
	<view class="box">
		<view class="navigation">
			<!-- <navigation></navigation> -->
		</view>
		<view class="Warehousing">
			<view class="title marTop">
				人员录入系统
			</view>
			<view class="table">
				<el-table :data="Data[page]" stripe style="width: 100%">
					<el-table-column prop="name" label="姓名" :width="width">
					</el-table-column>
					<el-table-column prop="phone" label="电话" :width="width">
					</el-table-column>
					<!-- 					<el-table-column prop="班级" label="班级" :width="width">
					</el-table-column>
					<el-table-column prop="学号" label="学号" :width="width">
					</el-table-column> -->
				</el-table>
			</view>
			<view class="fixed">
				<view class="bottom">
					<view class="paging">
						<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
							:current-page="currentPage4" :page-sizes="pageSizes" :page-size="numOfPage"
							layout="total, sizes, prev, pager, next, jumper" :total="total">
						</el-pagination>
					</view>

					<view class="icon">
						<el-upload ref="upload" accept=".xls,.xlsx" action="" :auto-upload="false"
							:on-change="handleUpload" :show-file-list="false">
							<el-button>导入excel</el-button>
						</el-upload>
					</view>
				</view>
				<view class="btn button">
					<el-button type="primary" plain :disabled="flag" @click="adopt">{{text}}</el-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navigation from './navigation.vue'
	import xlsx from 'xlsx'
	import {invitationAppend} from '../models/baseModel.js'
	export default {
		name: "Warehousing",
		components: {
			navigation
		},
		mounted() {
			let obj = uni.createSelectorQuery().select('.table');
			obj.boundingClientRect(function(data) {
				console.log('元素信息：', data)
				console.log(data.width)
				this.width = data.width / 4
				console.log(this.width)
			}).exec()
		},
		data() {
			return {
				width: 0,
				currentPage4: 1,
				tableData: [],
				Data: [],
				page: 0,
				numOfPage: 9,
				pageSizes: [9, 18, 27, 36, 45],
				total: 50,
				flag: true,
				text: "请先导入excel文件",
				loading:true
			};
		},
		methods: {
			handleSizeChange(val) {
				console.log(`每页 ${val} 条`);
				this.page = val - 1
			},
			handleCurrentChange(val) {
				console.log(`当前页: ${val}`);
				this.page = val - 1
			},
			changePage(data) {
				let arr = []
				let arrs = []
				for (let i = 0, j = 1; i < data.length; i++, j++) {
					arrs.push(data[i])
					if (j % this.numOfPage == 0) {
						arr.push(arrs)
						arrs = []
					}
					if (i == data.length - 1) {
						arr.push(arrs)
						arrs = []
					}
				}
				console.log(arr)
				this.Data = arr
			},
			DataLen(data) {
				let that = this
				let arr = Array(...Array(data.length)).map((v, i) => i + 1)
				// console.log(arr.filter(this.checkAdult())
				this.pageSizes = arr.filter(function(age) {
					return age % that.numOfPage == 0 || age == data.length;
				})
				console.log(arr)
				this.total = data.length
				this.flag = false
				this.text = "提交"
			},
			readExcel(file) {


				const reader = new FileReader()
				const result = [] // 保存转化成功的 json格式
				reader.onload = e => {
					const data = e.target.result
					const wb = xlsx.read(data, {
						type: 'binary'
					})
					wb.SheetNames.forEach((sheetName) => {
						result.push({
							sheetName: sheetName,
							sheet: xlsx.utils.sheet_to_json(wb.Sheets[sheetName]) // 生成JSON表格内容
						})
					})


					const test = []
					for (let item of result) {
						let time = null
						console.log(item.sheet[0])
						// if(item.sheet[0]&&){//做一些判断，主要是Excel表中对应字段是否存在

						// }
						// excel导出json格式数据中有关时间的转换（因为导出json的时间格式为数字了，所以需要转换）
						// if (typeof item['时间'] === 'number') {
						// 	time = new Date(1900, 0, item['时间'] - 1).toLocaleDateString()
						// }
					}
					this.changePage(result[0].sheet)
					this.DataLen(result[0].sheet)
					result[0].sheet.forEach(x => {
						x.phone += ""
					})
					this.tableData = result[0].sheet
				}
				reader.readAsBinaryString(file.raw)
			},
			handleUpload(file) {
				this.readExcel(file) // 如果在这里接收导出的 json 数据的话，会拿不到预期结果
			},
			adopt() {
				console.log(this.tableData)
				this.$emit("reLoad", true);
				console.log(this.tableData)
				invitationAppend({
					users:this.tableData
				})
				.then(res =>{
					console.log(res)
					this.$emit("reLoad", false);
					if(res.data.status=="error"){
						this.$message({
							message: '提交失败,号码：'+res.data.detail.phone+"重复",
							type: "success"
						})
					}else{
						this.$message({
							message: "提交成功",
							type: "success"
						})
						this.$emit("reLoads", false);

					}
				})
				.catch(err=>{
					console.log(err)
					this.$emit("reLoad", false);
					this.$message({
						message: '提交',
						type: "eror"
					})
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

	.table {
		/* width: 100vw; */
	}

	.paging {
		/* 		position: fixed;
		bottom: 80rpx; */
		margin-top: 60rpx;
	}

	.box {
		margin-top: 60rpx;
		width: 80%;
		display: flex;
	}

	.navigation {
		/* flex: 1; */
		height: 500px;
		background-color: #E2F7F7;
		margin-right: 60px;
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
		padding-bottom: 240rpx;
		position: relative;
		min-height: 1200rpx;
	}

	.icon {
		/* width: 60px;
		height: 60px;
		background-color: #409EFF;
		border-radius: 50%; */
		/* position: fixed;
		bottom: 100rpx; */
		color: #FFFFFF;
		font-size: 100rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		right: 40rpx;
	}

	.bottom {
		display: flex;
		justify-content: space-around;
	}

	.button {
		display: flex;
		justify-content: center;
	}

	.fixed {
		position: absolute;
		bottom: 40rpx;
		width: 100%;
	}
</style>
