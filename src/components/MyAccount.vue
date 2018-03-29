
<template>

<div>
	<mt-header fixed :title="我的资料">
		<mt-button icon="back" slot="left" @click.native="goback()">返回</mt-button>
	</mt-header>
	<mt-header title=" "></mt-header>
	<mt-cell title="头像" is-link></mt-cell>
	<mt-cell title="用户名" :value="me.username" is-link></mt-cell>
	<mt-cell title="微信号" :value="me.wechat_id" is-link></mt-cell>
	<mt-cell title="二维码"></mt-cell>
	<mt-cell title="更多"  is-link></mt-cell>
</div>

</template>

<script type="text/javascript">

import { mapState } from 'vuex';

export default {
	name: "myAccount",
	computed: {
		...mapState(["me"]),
	},
	methods: {
		goback() {
			this.$router.go(-1)
		}
	}
}

</script>

<style type="text/css">

.mint-cell-value.is-link {
    margin-right: 24px;
    margin-left: auto;
}

</style>