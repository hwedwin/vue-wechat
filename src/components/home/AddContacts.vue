<template>

<div>
	<div>
		<input type="text" name="wechatId" v-model="wechatId" placeholder="请输入微信号">
		<mt-search
			v-model="searchKey"
			cancel-text="取消"
			placeholder="请输入微信号">
		</mt-search>
	</div>
	<div>
		
	</div>
</div>

</template>

<script type="text/javascript">



export default {
	name: "addContacts",
	data: function() {
		return {
			wechatId: "",
		}
	}
}

</script>