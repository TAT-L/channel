<template>
	<view class="content">
		<!-- PC 端导航栏 -->
		<!-- #ifndef MP -->
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" styleType="button"
			activeColor="#409eff" class="tabBar">
		</uni-segmented-control>
		<!-- #endif -->
		<index-main class="indexMain" v-if="current === 0"></index-main>
		<user-main class="userMain" v-else></user-main>
	</view>
</template>

<script>
	import indexMain from '../../components/indexMain.vue'
	import userMain from '../../components/userMain.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				current: 0,
				items: ["首页", "个人"]
			}
		},
		components: {
			indexMain,
			userMain
		},
		onLoad() {

		},
		methods: {
			onClickItem(e) {
				this.current = e.currentIndex
				if (e.currentIndex == 1) {

				}
			}


		}
	}
</script>

<style lang="scss" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		.indexMain {}
	}

	.tabBar {
		width: 90%;
		margin: 40rpx auto;
	}

	
</style>
