<template>
	<view class="main">
		<view class="abilitis">
			<view class="ability" v-for="(item,key) in assembly" @click="jump(item)">
				<image :src="item.ruls" class="img" mode="widthFix"></image>
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
				ruls:"../static/可操作票据查询和维护.png",
				assembly: [{
					value: '../index/index?page=0',
					label: "注册查看",
					ruls:require("../static/采集盒列表.png")
				}, {
					value: '../index/index?page=1',
					label: "人员录入",
					ruls:require("../static/注册灰色.png")
				}, {
					value: '../examine/examine',
					label: "注册审核",
					ruls:require("../static/审核.png")
				}, {
					value: "../check/check?page=0",
					label: "当日考勤",
					ruls:require("../static/考勤.png")
				}, {
					value: "../examined/examined",
					label: "人员总览",
					ruls:require("../static/预设人员.png")
				}, {
					value: "../work/work",
					label: "操作票",
					ruls:require("../static/操作票.png")
				}, {
					value: '../equipment/equipment',
					label: "设备处理",
					ruls:require("../static/设备状态.png")
				}]
			};
		},
		methods: {
			jump(e) {
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
		padding: 10rpx;
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
			padding-bottom: 40rpx;

			.ability {

				margin: 30rpx 10rpx;
				// flex: 4;
				height: 140rpx;
				width: 140rpx;
				border-radius: 50%;
				// border: 1px solid orange;
				position: relative;
				cursor: pointer;
			}

			.title {
				width: 140rpx;
				position: absolute;
				top: 150rpx;
				text-align: center;

			}

			.text {
				font-size: 34rpx;
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
	.img{
		width: 100%;
		height: 100%;
	}
</style>
