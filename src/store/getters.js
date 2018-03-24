
export const getMessagesById = (state) =>(uid) => {

	if(!state.chats[uid] || !state.chats[uid].messages)
		return []

	let msgs = state.chats[uid].messages

	msgs.sort((e1, e2)=>{
		return e1.send_date - e2.send_date
	})

	return msgs
}


export const getFriendById = (state) => (uid) => {
	
	if(!uid || !state.chats[uid] || !state.chats[uid].friendInfo)
		return null
	return state.chats[uid].friendInfo
}

export const isOtherUserPage = (state)=>{
	return state.userPage
}

export const getOtherUserInfo = (state)=>{
	return state.userPageInfo
}


export const getUnreadMessagesById = (state) => (uid) => {

	if(state.friends[uid])
		return state.friends[uid].unreadMessages ? state.friends[uid].unreadMessages : []
	return []
}


export const getUnreadAddFriendMsgCount = (state)=>{
	return state.addFriendMessages.filter(val=>{
		return !val.read && val.sender !== state.me.uid
	}).length
}

export const getUnreadMessages = (state)=>{

	let result = []
	for(let uid in state.chats) {
		if(state.chats[uid].messages.length === 0)
			continue;
		let chat = {...state.chats[uid]}
		chat.messages.sort((e1, e2)=>{
			return -(e1.send_date - e2.send_date)
		})
		chat.least_date = chat.messages[chat.messages.length-1].send_date
		result.push(chat)
	}
	result.sort((e1, e2)=>{
		return -(e1.least_date - e2.least_date)
	})
	return result
}

export const getMessageSendingById = (state)=>(id)=>{

	return state.messageSending.filter((val)=>{
		return val.receiver == id
	})
}


export const getFriends = (state) => {
	
	let res = []
	for(let uid in state.chats) {
		res.push(state.chats[uid].friendInfo)
	}
	res.sort((e1, e2)=>{
		if(e1.username < e2.username)
			return -1;
		if(e1.username > e2.username)
			return 1;
		return 0
	})
	return res
}

export function getMessageList (state) {
	
	let result = []
	for(let uid in state.chats) {
		if(state.chats[uid].messages.length === 0)
			continue;
		let chat = {...state.chats[uid]}
		chat.messages.sort((e1, e2)=>{
			return -(e1.send_date - e2.send_date)
		})

		chat.unreadCount = chat.messages.reduce((cnt, val)=>{
			if(!val.read && val.sender !== state.me.uid)
				return cnt+1
			else
				return cnt
		}, 0)
		chat.least_date = chat.messages[0].send_date
		result.push(chat)
	}
	result.sort((e1, e2)=>{
		return -(e1.least_date - e2.least_date)
	})



	return result

}