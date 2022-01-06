<template>
	<view class="page">
		
		<user-main class="userMain"></user-main>
	</view>
</template>

<script>
	import userMain from '../../components/userMain.vue'
	export default {
		components:{
			userMain
		},
		data() {
			return {
				title: 'Hello',
				current: 0,
				items: ["首页", "个人"]
			}
		},
		methods:{
			onClickItem(e){
				this.current = e.currentIndex
			}
		}
		
		
	}
</script>

<style lang="scss"  scoped>
	.page {
		height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		.tabBar {
			width: 90%;
			margin: 40rpx auto;
		}
		.userMain {
			
		}
	}
</style>

