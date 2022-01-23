<template>
	<view>
        <view class="start">
        	<text class="text">请选择开始日期</text>
        	<uni-section :title="'日期用法：' + start" type="line"></uni-section>
        	<view class="example-body">
        		<uni-datetime-picker :clearIcon="false" type="date" :value="start"  @change="change" />
        	</view>
        </view>
		<view class="start">
			<text class="text">请选择结束日期(非必填)</text>
			<uni-section :title="'日期用法：' + end" type="line"></uni-section>
			<view class="example-body">
				<uni-datetime-picker  type="date" :value="end"   @change="changes" />
			</view>
		</view>
		<view class="start">
			<text class="text">请选择结束日期(非必填)</text>
			<uni-combox :candidates="tickeData" placeholder="选择操作票类型" v-model="ticke"></uni-combox>
		</view>
		<view class="start button">

				<button type="default" class="btn">取消并返回</button>
				<button type="default" class="btn" @click="adopt">提交</button>

		</view>
	</view>
</template>

<script>
	import {
		tickeCreate
	} from '../../models/baseModel.js'
    export default {
        data() {
            return {
                single: "2021-04-3",
                start:"2021-04-3",
				end:"2021-04-3",
				tickeData:[{
						value: 'time',
						label: '默认'
					},
					{
						value: 'monthly',
						label: '每月'
					}, {
						value: 'weekly',
						label: '每周'
					}, {
						value: 'daily',
						label: '每天'
					}, {
						value: 'weekday',
						label: '每工作日'
					}
				],
				ticke:""
            };
        },

        watch: {
 
        },
        mounted() {

        },

        methods: {
            change(e) {
                this.start = e;
                console.log("-change事件:", e);
				console.log( Date.parse(e))
            },
			changes(e) {
			    this.end = e;
			    console.log("-change事件:", e);
			},
			adopt(){
				let data={
						start_time: Date.parse(this.start),
						end_time: Date.parse(this.end),
						rule: this.ticke
					}
					console.log(data)
				tickeCreate(data)
					.then(res=>{
						console.log(res)
						uni.redirectTo({
						    url: '/pages/work/work'
						});
					})
					.catch(err=>{
						console.log(err)
					})
			}
        },
    };
</script>

<style lang="scss">
    // @import "@/common/uni-nvue.scss";
	.start{
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: center;
		padding: 40rpx 0;
	}
	.text{
		font-size: 35rpx;
		font-weight: 700;
		padding: 10rpx 0;
	}
	// .button{
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content:flex-end;
	// }
	.btn {
		margin: 0 !important;
		width: 200rpx !important;
		padding-left: 0;
		padding-right: 0;
		font-size: 30rpx;
		border-color: #409EFF;
		padding: none !important;
		background-color: #409eff !important;
		color: #FFFFFF !important;
		border-radius: 20rpx;
	}
	.button{
		flex-direction: row;
		justify-content: space-around;
	}
</style>