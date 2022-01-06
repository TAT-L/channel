<template>
	<view class="main">
		<view class="abilitis">
			<view class="ability" v-for="(item,key) in assembly" @click="jump(item)">
             <!-- {{key}}{{item}} -->
			 <view class="title">
			 	<text class="text">{{item.label}}</text>
			 </view>
			</view>

		</view>
		<view class="box">

		</view>
	</view>
</template>

<script>
	export default {
		name: "indexMain",
		data() {
			return {
                 assembly:[{value:'../Warehousing/Warehousing',label:"注册查看"},{value:"../check/check",label:"当日考勤"},{value:"../create/create",label:"考勤总览"},{value:"../work/work",label:"操作票"},{value:'../enter/enter',label:"人员录入"}]
			};
		},
		methods:{
			jump(e){
				console.log(e.value)
				this.$emit("jump", e.value);
                
			}
		}
	}
</script>

<style lang="scss" scoped>
	.main {
		
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 10rpx ;
		width: 100vw;
		height: 100vh;
		background-color: $uni-bg-color-grey;
		.abilitis {
			background-color: $uni-bg-color;
			display: flex;
			justify-content: space-around;
			flex-wrap: wrap;
			width: 90%;
			border-radius: 10px;
			box-shadow: 3px 3px 7px 7px #eee;
			padding-bottom: 20rpx;
			.ability {
					
				margin: 30rpx 10rpx;
				// flex: 4;
				height: 100rpx;
				width: 100rpx;
				border-radius: 50%;
				border: 1px solid orange;
				position: relative;
			}
			.title{
				width: 100rpx;
				position: absolute;
				top: 100rpx;
				text-align: center;
				
			}
			.text{
				font-size: 25rpx;
			}
			
		}

		.box {
				box-shadow: 3px 3px 7px 7px #eee;
			border-radius: 10px;
			background-color: $uni-bg-color;
			margin-top: 40rpx;
			height: 600rpx;
			width: 90%;
		}

	}
</style>
