<template name="tab">
	<view class="table">
		<view class="uni-container">
			<uni-table ref="table" :loading="loading" border stripe type="selection" emptyText="暂无更多数据"
				@selection-change="selectionChange">
				<uni-tr>
					<uni-th align="center" v-for="(item,index) in title" :key="index" :width="headers[index]" >{{item}}</uni-th>
				</uni-tr>
				<uni-tr v-for="(item, index) in tableData" :key="index">
					<uni-td align="center" v-for="(items,indexs) in name" :key="indexs" :title="items" :item="item"></uni-td>
<!-- 					<uni-td>
						<view class="name" align="center">{{ item.address }}</view>s
					</uni-td>
					<uni-td align="center">{{ item.date }}</uni-td> -->
					<uni-td align="center">
						<!-- <view class="uni-group" :style="{width:headers[num]+px}"> -->
							<button type="default" class="btn" @click="delate(item)">删除</button>
							<!-- <slot></slot> -->
						<!-- </view> -->
					</uni-td>
				</uni-tr>
			</uni-table>
		</view>
	</view>
</template>

<script>
	export default {
		name:"table",
		data() {
			return {
				num:30
			}
		},
		props:{
			tableData:{
				type:Array,
				default:[]
			},
			headers:{
				type:Array,
				default:[]
			},
			title:{
				type:Array,
				default:[]
			},
			name:{
				type:Array,
				default:[]
			}
		},
		onLoad() {
         console.log(this.name)
		 let num=this.headers.length;
		 this.num=num-1
		},
		methods: {
			// 多选处理
            delate(e){
				console.log(e)
				this.$emit("back", e);
			}
		}
	}
</script>

<style>
	.uni-group {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 100%;
	}
	
	.button {
		color: #000000;
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
/* 	.table{
		width: 80rpx;
		height: 80rpx;
		background-color: #000000;
	} */
</style>
