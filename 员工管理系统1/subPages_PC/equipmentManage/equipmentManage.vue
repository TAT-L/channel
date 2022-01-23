<template>
	<view>
		<detail v-if="flag" :sn="sn" @backs="backs"></detail>
		<list @back="back" v-else></list>
	</view>
</template>

<script>
	import list from '../../component/equipment.vue'
	import detail from '../../component/details.vue'
	export default {
		data() {
			return {
				flag:false,
				sn:""
			}
		},
		methods: {
			back(e){
				console.log(e)
				this.sn=e.sn
				this.flag=e.flag
			},
			backs(e){
				this.flag=e
			}
		},
	    components:{
			list,
			detail
		}
	}
</script>

<style>
 /deep/ .el-table /deep/ .el-table__cell{
	text-align: center!important;
}
</style>
