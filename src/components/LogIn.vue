<template>

	<div>
		<form @submit="doLogIn">
		<mt-field label="微信号" placeholder="请输入微信号" v-model="wechatId"></mt-field>
		<mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
			<button @click="doLogIn">登陆</button>
		</form>
		<div>
			<button>无法登陆？</button>
			<button @click="toggoleSheet">更多</button>
		</div>
		<mt-actionsheet
		  :actions="actions"
		  v-model="sheetVisible">
		</mt-actionsheet>
	</div>
</template>

<script type="text/javascript">
import { Indicator } from 'mint-ui'
import { wechatIdCheck } from '../util/index'

export default {
	name: "login",
	data: function () {
		return {
			actions: [{
				name: "注册",
				method: function() {
					console.log("direct to sign up page")
				}
			}, {
				name: "反馈",
				method: function() {
					console.log("direct to feedback page")
				}
			}],
			sheetVisible: false,
			wechatId: "",
			password: "",
		}
	},
	methods: {
		toggoleSheet: function () {
			this.sheetVisible = !this.sheetVisible
		},
		doLogIn: function (event) {
			event.preventDefault()
			console.log(this.wechatId, this.password)

			if(this.wechatId === "") {
				console.log("wechatId required")
				return
			} else if(this.password === "") {
				console.log("password required")
				return
			} else if(!wechatIdCheck(this.wechatId)) {
				console.log("false")
				return
			}

			console.log("lgin")

			Indicator.open("登陆中")
			let form = new FormData()
			form.append("wechatId", this.wechatId)
			form.append("password", this.password)

			this.$http({
				url: "/login",
				method: "post",
				data: {
					wechatId:this.wechatId,
					password: this.password
				}
			}).then(response=>{

				let data = response.data
				if(data.error) {
					console.log("data.error")
				} else if(data.user) {
					this.$lockr.set("user", data.user)
					this.$router.push("/")
					this.$socket.emit("login", { 
						uid: data.user.uid
					})
				}

				Indicator.close()

			}).catch(error=>{
				console.log(error)
				Indicator.close()
			})
		}
	}

}

</script>