<template>
	<view>
		<view class="boxs">
			<view class="records">
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="status">
						打卡成功
					</view>
				</view>
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="status">
						打卡成功
					</view>
				</view>
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="status">
						打卡成功
					</view>
				</view>
				<view class="record box">
					<view class="time">
						2021-2-2 13:12
					</view>
					<view class="status">
						打卡成功
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.boxs {
		margin: 0 auto;
		margin-top: 40rpx;
		height: 600rpx;
		width: 90%;

		.records {
			.record {
				font-size: 30rpx;
				padding: 0rpx 20rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;

				.status {
					color: $uni-color-success;
				}
			}
		}

		.box {
			height: 100rpx;
			margin-bottom: 20rpx;
			background-color: $uni-bg-color;
			border-radius: 10px;
			box-shadow: 3px 3px 7px 7px #eee;
		}
	}
</style>
