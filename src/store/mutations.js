
import Vue from 'vue'



export function pushAddFriendMessage(state, { message }) {
	message.read = false

	let idx = state.addFriendMessages.findIndex((val)=>{
		return val.receiver === message.receiver
	})

	if(idx < 0)
		idx = state.addFriendMessages.length

	Vue.set(state.addFriendMessages, idx, message)

	
}

export function readAddFriendMessage(state) {
	state.addFriendMessages.forEach((val)=>{
		val.read = true
	})
}

export function setMessageRecord(state, { user, records }) {

	if(!state.friends[user])
		return

	let messages = state.friends[user].messages ? state.friends[user].messages : []

	for(let i = 0; i < records.length; ++i) {
		if(messages.some((val)=>records[i].mid == val.mid))
			continue;
		messages.push(records[i])
	}

	state.friends[user].messages = messages
}



export function pushSendingMessage(state, { sending }) {

	Vue.set(state.messageSending, state.messageSending.length, sending)
}

export function messageSent(state, { token, mid }) {

	let index = state.messageSending.findIndex((val)=>{
		return val.token === token
	})

	let msg = state.messageSending[index]

	state.friends[msg.to].messages.push({
		mid: mid,
		sender: msg.from,
		receiver: msg.to,
		content: msg.content,
		//send_date
	})

	state.messageSending.splice(index, 1)
}

export function initUser(state, { user }) {
	state.me = user
}

export function confirmMessageSent(state, {token}) {
	let index = state.messageSending.findIndex((val)=>{
		return val.token
	})

	let message = state.messageSending[index]
	state.messageSending.splice(index, 1)

	message.send_date = Date.now()

	Vue.set(state.chats[message.receiver].messages, 
		state.chats[message.receiver].messages.length, message)

}

export function pushFriends(state, { user }) {

	if(user instanceof Array) {
		for(let i = 0; i < user.length; ++i) {
			let u = user[i]

			if(!state.chats[u.uid])
				Vue.set(state.chats, u.uid, {
					friendInfo: u,
					messages: []
				})
			else
				state.chats[u.uid] = {...state.chats[u.uid], friendInfo: u}

		}
	}else {

		let u = user
		if(!state.chats[u.uid])
			Vue.set(state.chats, u.uid, {
				friendInfo: u,
				messages: []
			})
		else
			state.chats[u.uid] = {...state.chats[u.uid], friendInfo: u}
	}
}


export function setChat(state, { uid, chat }) {
	state.chats[uid] = chat
}


export function setAddFriendMessages(state, { addFriendMessages }) {
	state.addFriendMessages = addFriendMessages
}

export function readAll(state, { uid }) {

	if(!uid || !state.chats[uid])
		return

	state.chats[uid].messages.forEach( function(val) {
		if(val.sender === uid)
			val.read = true
	});

}

export function toggleSearching(state) {
	state.showSearch = !state.showSearch
}