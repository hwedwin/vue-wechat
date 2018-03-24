
<template>

<div class="user" v-if="user">
	<mt-header fixed :title="user.username">
		<mt-button icon="back" slot="left" @click.native="goback">返回</mt-button>
	</mt-header>
	<mt-header title="搜索结果"></mt-header>

	<div class="list">
		<list-button 
			:text="user.username"
			:img="user.avatar"
			:key="user.wechat_id"
			:headline="'微信号:' + user.wechat_id">
		</list-button>
	</div>

	<div class="list">
		<div class="list-item">
			添加标签
			<div class="right-arrow"></div>
		</div>
	</div>
	<div class="list" v-if="user.region || user.whats_up">
		<div class="list-item list-item-bcol" v-if="user.region">
			<div>地区</div>
			<div>{{ user.region }}</div>
		</div>
		<div class="list-item" v-if="user.whats_up">
			<div>动态</div>
			<div>{{ user.whats_up }}</div>
		</div>
	</div>

	<div v-if="isFriend" class="button-list">
		<button style="background-color:white;">删除好友</button>
		<button style="background-color:rgb(54, 171, 96); color:white;"
			@click="toChats">发送消息</button>
	</div>
	<div v-else class="button-list">
		<button @click="addFriend" style="background-color:rgb(54, 171, 96); color:white;">添加好友</button>
	</div>

</div>
</template>

<script type="text/javascript">
import PlainButton from './element/PlainButton'
import ListButton from './element/ListButton'
import { mapGetters, mapState } from 'vuex'

export default {
	name: "userPage",
	data: function() {
		return {
			isFriend: false,
			user: null
		}
	},
	components: { ListButton, PlainButton },
	computed: {
		...mapGetters(["getFriendById"]),
		...mapState(["me"]),
		friend: function () {
			this.isFriend = !!this.getFriendById(this.$route.params.uid)
			return "";
		}
	},
	watch: {
	},
	methods: {
		deleteFriend() {
			console.log("deleting friend")
		},
		addFriend: function () {

			if(!this.user || !this.user.uid)
				return

			let msg =  {
				type: "addFriend",
				sender: this.me.uid,
				receiver: this.user.uid,
				message: "todo",
				userInfo: this.user
			}

			this.$socket.emit("send", msg)

			this.$store.commit("pushAddFriendMessage", { message: msg })

		},
		beginChat() {
			console.log("begin chat")
		},
		goback() {
			this.$router.go(-1)
		},
		toChats() {
			this.$router.push({
				name: "chat",
				params: {
					uid: this.user.uid
				}
			})
		}

	},
	created: function() {
		let uid = this.$route.params.uid
		let user = this.getFriendById(uid)
		console.log(user)
		if(!user) {
			this.$http({
				url: "/user/" + uid,
				method: "get"
			}).then(res=>{

				let data = res.data
				if(data.error) {
					console.log(data.error)
				} else if(data.data) {
					console.log(data.data)
					this.user = data.data

					if(data.data.isFriend)
						this.isFriend = true
				}
			})

		} else {
			this.user = user
			this.isFriend = true
		}
	},
}

</script>

<style type="text/css">

.user {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100;
	background-color: #ececec;
}


.list-item {
	display: flex;
	align-items: center;
	padding: 8px;
	background-color: white;	

}

.list-item .right-arrow {
	margin-left: auto;
}


.button-list {
	display: flex;
	flex-direction: column;
	padding: 8px;
	min-height: 60px;
	justify-content: center;
}

.button-list > button {
	border: solid lightgrey 1px;
	border-radius: 4px;
	padding: 10px;
	margin-bottom: 10px;
}

.list {
	border-top: solid rgba(200, 200, 200, 0.3) 1px;
	border-bottom:solid rgba(200, 200, 200, 0.3) 1px;
	margin-top: 10px;
}


.list-item-bcol {
	justify-content: space-between;
}

</style>