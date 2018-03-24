
import { Indicator } from 'mint-ui';

function initClient(vm) {

	vm.$socket.on("connect", ()=>{
		console.log("connect to server")
	})

	vm.$socket.on("receive", (message)=>{

		console.log(message)

		if(message.type === "login") {
			console.log(message)

			let chats = message.chats

			for(let uid in chats) {
				vm.$store.commit("setChat", {
					uid: uid,
					chat: chats[uid]
				})
			}

			let addFriendMessages = message.addFriendMessages

			vm.$store.commit("setAddFriendMessages", { addFriendMessages })

		} else if(message.type === "addFriend") {

		} else if(message.type === "chat") {

		} else if(message.type == "error") {
			let err = message.error
			if(err.code === 10001) {
				Indicator.open("登陆过期")
				let user = vm.$lockr.get("user")
				if(user)
					vm.$lockr.set("lastUser", user)
				vm.$lockr.rm("user")
				vm.$router.push("/login")
				Indicator.close()
			}
		}

	})

	vm.$socket.on("confirm", (message)=>{
		let token = message.token

		if(token) {
			vm.$store.commit("confirmMessageSent", message)
		}

	})

}

export {initClient}