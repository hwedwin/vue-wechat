<template>
<div>
	<mt-field label="用户名" placeholder="请输入用户名" v-model="username"></mt-field>
	<mt-field label="微信号" placeholder="请输入微信号" v-model="wechatId"></mt-field>
	<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
	<button @click="doSignUp">注册</button>
</div>
</template>

<script type="text/javascript">

import { wechatIdCheck } from '../util/index'
import { Toast } from 'mint-ui';

export default {
	name: "signup",
	data: function () {
		return {
			username: "",
			wechatId: "",
			password: "",
		}
	},
	methods: {
		doSignUp: function() {

			if(this.username === "") {
				this.toast("请输入用户名"); return;
			} else if(this.password === "") {
				this.toast("请输入密码"); return;
			} else if(this.wechatId === "") {
				this.toast("请输入微信号"); return;
			} else if(!wechatIdCheck(this.username)) {
				this.toast("用户名中不能包含非法字符"); return
			} else if(!wechatIdCheck(this.wechatId)) {
				this.toast("微信号中包含非法字符"); return
			}

			this.$http({
				method: "post",
				url: "/signup",
				data: {
					username: this.username,
					wechatId: this.wechatId,
					password: this.password
				}
			}).then(response=>{

				let data = response.data
				if(data.error) {
					console.log(data.error)
				} else if(data.user){
					console.log(data.user)
					this.toast("注册成功")
					this.$router.push("/login")
				}

			})

		},
		toast: function(message) {
			Toast({
				message,
				position: "middle",
				duration: 1000,
			})
		}
	}
}

</script>