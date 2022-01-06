<template>
	<view class="content" v-loading="loading" element-loading-text="数据上传中" element-loading-spinner="el-icon-loading"
		element-loading-background="rgba(0, 0, 0, 0.8)">
    <Warehousing @reLoad="reLoad" @reLoads="reLoads" v-if="page==1"></Warehousing>
	<warehouse-list @reLoad="reLoad" v-else></warehouse-list>
	</view>
</template>

<script>
	import Warehousing from '../../component/Warehousing.vue'
	import WarehouseList from '../../component/WarehouseList.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				loading:false,
				page:-1
			}
		},
		components:{
			Warehousing,
			WarehouseList
		},
		onLoad(option) {
        this.page=option.page
		console.log(option.page)
		},
		methods: {
            reLoad(e){
				console.log(e)
				this.loading=e
			},
			reLoads(e){
				console.log("该跳转了")
				uni.navigateTo({
					url:'../updata/updata'
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-height: 100vh;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
