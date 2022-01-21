<template>
	<view class="page">
		<view class="cover" @click.once="getWXInfo" v-if="cover">
			
		</view>
		<user-main class="userMain" :userInfo='userInfo'></user-main>
	</view>
</template>

<script>
	import {
		getWorkerInfo
	} from '../../models/userModel.js'
	import userMain from '../../components/userMain.vue'
	export default {
		components: {
			userMain
		},
		data() {
			return {
				userInfo: {
					name: '张三',
					phone: '12221222122',
					avatarUrl:''
				},
				cover: true
				// title: 'Hello',
				// current: 0,
				// items: ["首页", "个人"]
			}
		},
		onLoad() {
			uni.$on('refreshUserInfo',(res) => {
				if(res){
					this.getWorkerInfo()
				}
			})
			if(getApp().globalData.identity.includes('manager')){
				
		}
			if(getApp().globalData.identity.includes('worker')){
				
				this.cover = false
				this.getWorkerInfo()
			}
			
			
			
		},
		methods: {
			// onClickItem(e) {
			// 	this.current = e.currentIndex  
			// },
			getWXInfo() {

				uni.getUserProfile({
					desc: '用户管理',
					success:(WXInfoRes) => {
						
						this.userInfo.avatarUrl = 	WXInfoRes.userInfo.avatarUrl
						this.userInfo.name = WXInfoRes.userInfo.nickName
						console.log(WXInfoRes)

					},
					fail(res) {
						console.log(res)
					},
					complete:() => {
						this.cover = false
					}
				})
			},
			getWorkerInfo() {
				getWorkerInfo().then((getWorkerInfoRes) => {
					if (getWorkerInfoRes.data.detail.user)
					this.userInfo.phone = 	getWorkerInfoRes.data.detail.user.phone
					this.userInfo.name = getWorkerInfoRes.data.detail.user.name
						
					console.log(getWorkerInfoRes)
				})
			},
		}


	}
</script>

<style lang="scss" scoped>
	.page {
		// height: 100vh;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;

		.cover {
			z-index: 2;
			position: absolute;
			width: 100vw;
			height: 100vh;
		}

		.tabBar {
			width: 90%;
			margin: 40rpx auto;
		}

		.userMain {}
	}
</style>
