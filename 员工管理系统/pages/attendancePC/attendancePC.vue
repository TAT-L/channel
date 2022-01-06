<template>
	<view>
		<check v-if="page==0"></check>
		<totalchck v-else></totalchck>
	</view>
</template>

<script>
	import check from '../../component/check.vue'
	import totalchck from "../../component/totalCheck.vue"
	export default {
		data() {
			return {
				page:-1
			}
		},
		methods: {
			
		},
		components:{
			check,
			totalchck
		},
		onLoad(option) {
			this.page=option.page
		}
	}
</script>

<style>

</style>
