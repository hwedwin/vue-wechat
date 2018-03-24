
var redis = require("../redis/index")
var { getUserInfo, addFriend } = require("../model/user")
var { saveMessage } = require("../model/message")
var auth = require("./auth")
var { WError } = require("../util/global")


function initClientSocket(client, socket) {
	client.on("connect", ()=>{
		auth(client)
		.then(res=>{
			if(res) {
				handleLoggin(client, socket, data.uid)
			}
		}).catch(error=>{
			console.log(error)
		})

	})

	client.on("login", (data)=>{
		auth(client)
		.then(res=>{
			if(res) {
				handleLoggin(client, socket, data.uid)
			} else {
				client.emit("receive", {
					type: "error",
					error: WError.PERMISSION_DENIED.error
				})
			}
		}).catch(error=>{
			console.log(error)
		})

	})

	client.on("send", (message)=>{

		auth(client)
		.then(res=>{
			if(res) {
				console.log(message)
				if(message.type === 'chat')
					handleChatMessage(client, socket, message)
				else if(message.type === "addFriend")
					handleAddFriendsMessage(client, socket, message)
				else if(message.type === "readAll")
					handleReadAll(client, socket, message)
			} else {
				client.emit("receive", {
					type: "error",
					error: WError.PERMISSION_DENIED
				})
			}

		}).catch(error=>{
			console.log(error)
		})


	})

	client.on("disconnect", ()=>{
		clearSocketId(client)
	})
}


//message.type === 'chat'
//someone has sent this message to the current 
//
function handleChatMessage(client, server, message) {

	message.read = false
	message.send_date = Date.now()

	console.log(message)

	let receiver = message.receiver
	let sender = message.sender
	let content = message.content
	saveMessage(content, sender, receiver)
		.then((insertId)=>{
			message.mid = insertId
		}).then(()=>{
			return redis.get(receiver)
		}).then(user=>{
			return initUserRedis(user, receiver, sender)
		}).then(user=>{
			user.chats[sender].messages.push(message)
			if(!user.clientId) {
			} else {
				server.to(user.clientId).emit("receive", message)
			}
			return redis.set(receiver, user)
		}).then(()=>{
			return redis.get(sender)
		}).then(user=>{
			return initUserRedis(user, sender, receiver)
		}).then(user=>{
			user.chats[receiver].messages.push(message)
			return redis.set(sender, user)
		}).then(()=>{
			client.emit("confirm", {
				token: message.token
			})
		}).catch(error=>{
			console.log(error)
		})				
}

function initUserRedis(user, uid, friendId) {

	return new Promise(function (resolve, reject) {
		if(!user)
			user = {}
		if(!user.chats)
			user.chats = {}
		if(!user.addFriendMessages)
			user.addFriendMessages = []
		if(!user.clientId)
			user.clientId = 0

		if(friendId) {
			if(!user.chats[friendId])
				getUserInfo(friendId)
						.then((friendInfo)=>{
					user.chats[friendId] = {}
					user.chats[friendId].friendInfo = friendInfo
					user.chats[friendId].messages = []
					console.log(user)
					resolve(user)
				}).catch(error=>{
					console.log(error)
					reject(error)
				})
			else
				resolve(user)
		} else {
			resolve(user)
		}
	})
}

function handleAddFriendsMessage (client, server, message) {


	message.send_date = Date.now()
	message.read = false
	message.confirmed = false
	console.log(message)
	let receiver = message.receiver
	let sender = message.sender

	getUserInfo(sender)
		.then(senderInfo=>{
			message.senderInfo = senderInfo
			return redis.get(receiver)
		}).then(user=>{
			return initUserRedis(user)
		}).then(user=>{

			let index = user.addFriendMessages.findIndex((val)=>{
				if(val.sender == sender)
					return true;
			})

			if(index >= 0)
				user.addFriendMessages[index] = message
			else
				user.addFriendMessages.push(message)
			if(user.clientId) {
				server.to(user.clientId).emit("receive", message)
			}
			return redis.set(receiver, user)
		}).then(()=>{
			return redis.get(sender)
		}).then(user=>{
			return initUserRedis(user)
		}).then(user=>{

			delete message.senderInfo
			let index = user.addFriendMessages.findIndex((val)=>{
				if(val.sender == sender)
					return true;
			})

			if(index >= 0)
				user.addFriendMessages[index] = message
			else
				user.addFriendMessages.push(message)

			return redis.set(sender, user)
		}).catch(error=>{
			console.log(error)
		})

}

function handleLoggin(client, server, uid) {

	redis.get(uid)
		.then(user=>{
			return initUserRedis(user, uid)
		}).then(user=>{
			user.clientId = client.id
			
			client.emit("receive", {
				type: "login",
				chats: user.chats, 
				addFriendMessages: user.addFriendMessages
			})

			return redis.set(uid, user)
		}).catch(error=>{
			console.log(error)
		})
}




function clearSocketId(client) {

	if(!client.uid)
		return

	let uid = client.uid
	redis.get(uid)
		.then((user)=>{
			user.clientId = 0
			return redis.set(uid, user)
		}).catch(error=>{
			console.log(error)
		})

}

function handleReadAll(client, server, message) {

	let me = message.me
	let other = message.other

	redis.get(me)
		.then(user=>{
			return initUserRedis(user, other)
		}).then(user=>{

			user.chats[other].messages.forEach((val)=>{
				if(val.sender === other)
					val.read = true
			})
			return redis.set(me, user)

		}).then(()=>{
			return redis.get(other)
		}).then(user=>{
			return initUserRedis(user, me)
		}).then(user=>{

			user.chats[me].messages.forEach((val)=>{
				if(val.sender === other)
					val.read = true
			})

			return redis.set(other, user)
		}).catch(error=>{
			console.log(error)
		})

}

module.exports = initClientSocket