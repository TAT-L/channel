<template>
	<view class="box marginTop">
		<images v-if="show" :url="url" @back="back"></images>
		<view class="title">
			设备相关人员
		</view>
		<view class="create">
			<el-button type="primary" round @click="handleClick()">同步</el-button>
			<el-button type="primary" round  @click="backs">返回</el-button>
		</view>
		<el-divider></el-divider>
				<view class="table">
					<el-table :data="tableData" border style="width: 100%" :default-sort="{prop: 'created_at'}">
						<el-table-column prop="user.name" label="人员" width="150">
						</el-table-column>
						<el-table-column prop="user.phone" label="电话" width="150">
						</el-table-column>
						<el-table-column prop="face_status" class="red" label="人脸状态" width="150">
							<template slot-scope="scope">
								<view :class="{ 'view': true, 'Success': scope.row.face_status==1,'Info':scope.row.face_status==0 ,'Danger':scope.row.face_status==-1||scope.row.face_status==2}">
									
								</view>
							</template>
						</el-table-column>
<!-- 						<el-table-column prop="face" label="人脸图像" width="200">
							<template slot-scope="scope">
								<view class="imgs">
									<image :src="scope.row.face" class="img" mode="widthFix"></image>
								</view>
							</template>

						</el-table-column> -->
						<el-table-column fixed="right" label="操作">
							<template slot-scope="scope">
								<el-button @click="image(scope.row)" type="text" size="small">查看头像</el-button>
							</template>
						</el-table-column>
						<!--            		<el-table-column fixed="right" label="电话">

            		</el-table-column> -->
					</el-table>
				</view>
	</view>
</template>

<script>
	import {
		terminalDetail
	} from '../models/baseModel.js'
	import {
		terminalSyncWorker
	} from '../models/baseModel.js'
    import images from './img.vue'
	export default {
		name: "popup",
		components:{
			images
		},
		props: {
			sn: {
				type: String,
				default: ''
			}
		},
		created() {
			terminalDetail({
					sn: this.sn
				})
				.then(res => {
					console.log(res.data.detail.workers)
					this.tableData = res.data.detail.workers
				// 0未同步（灰色），1已同步(l绿色)，-1图片不符合规范,2 当天无值班
				})
		},
		data() {
			return {
				tableData: [],
				show:false,
				url:""
			};
		},
		methods: {
			backs() {
				this.$emit("backs", false);
			},
			adopt() {
	
	
			},
			back(e){
				this.show=e
			},
			image(e){
				console.log(e)
				this.url=e.face
				this.show=true
			},
			handleClick() {
	            terminalSyncWorker({
					sn:this.sn
				})
				.then(res=>{
					console.log(res.data)
	                if(res.data.status=="success"){
						this.$message({
							message: '同步成功',
							type: "success"
						})
						this.$emit("back", false);
					}else{
						this.$message({
							message: '同步失败，请联系管理员',
							type: "error"
						})
					}
				})
				.catch(err=>{
					this.$message({
						message: '同步失败，请联系管理员',
						type: "error"
					})
				})
			}
		}
	}
</script>

<style>
	.view{
		width: 24rpx;
		height: 24rpx;
		border-radius: 50%;
	}
	.Success{
		background-color: #67C23A;
	}
	.Info{
		background-color: #909399;
	}
	.Danger{
		background-color: #F56C6C;
	}
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