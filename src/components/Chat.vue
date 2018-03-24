<template>

<div v-if="other">
	<mt-header fixed :title="other.username">
		<mt-button icon="back" slot="left" @click.native="goback()">返回</mt-button>
	</mt-header>
	<mt-header title=" "></mt-header>

	<div>
		<div v-for="rec in chatRecords" :key="rec.mid">
			<dialogue 
				:type="rec.sender === other.uid ? 'from' : 'to'"
				:user="rec.sender === other.uid ? other : me"
				:content="rec.content"></dialogue>
		</div>
		<div v-for="(rec, idx) in sendingRecords" :key="idx" class="sending">
			<dialogue 
				type="to"
				:user="me"
				:content="rec.content"></dialogue>
		</div>
		<div style="height: 50px;">
		</div>
	</div>

	<div style="position:fixed; left: 0; bottom: 0; width: 100%; background-color: white;box-shadow: 0 -1px 3px rgba(200, 200, 200, 0.6)">
		<chat-input v-model="message"
			@keyup.enter.native="sendMessage"></chat-input>
	</div>
</div>

</template>

<script type="text/javascript">

import { mapGetters, mapState } from 'vuex'
import Dialogue from './element/Dialogue'
import ChatInput from './element/ChatInput'
import { randomToken } from '../util/index'

export default {
	name: "chat",
	data: function() {
		return {
			otherUid: 0,
			message: "",
		}
	},
	components: { ChatInput, Dialogue },
	computed: {
		...mapState(["me"]),
		...mapGetters(["getMessageSendingById", "getMessagesById", "getFriendById"]),
		chatRecords: function () {
			return this.getMessagesById(this.otherUid)
		},
		sendingRecords: function() {
			return this.getMessageSendingById(this.otherUid)
		},
		other: function () {
			return this.getFriendById(this.otherUid)
		}
	},
	created: function(){
		this.otherUid = this.$route.params.uid
		this.readAll()
	},
	methods: {
		sendMessage() {

			if(!this.message)
				return

			let sending = {
				type: "chat",
				sender: this.me.uid,
				receiver: this.other.uid,
				content: this.message,
				token: randomToken()
			}
			console.log("sending message")
			this.$store.commit("pushSendingMessage", {
				sending
			})
			this.$socket.emit("send", {
				...sending
			})

			this.message = ""
		},

		goback() {
			this.$router.go(-1)
		},

		readAll() {
			this.$store.commit("readAll", {
				uid: this.otherUid
			})

			this.$socket.emit("send", {
				type: "readAll",
				me: this.me.uid,
				other: this.otherUid
			})
		}
	}
}

</script>

<style type="text/css">

</style>