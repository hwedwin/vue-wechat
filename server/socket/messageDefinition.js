
redis: {
	uid: {
		uid: uid,
		clientId:Number,
		addFriendMessages: [{
			*sender: Number,
			*receiver: Number,
			*send_date: Date,
			read: Boolean,
			confirmed: Boolean,
			*message: String,
			senderInfo: Object,
		}],


		//once user log in, send all chats message stored in redis to user
		//if a friend is deleted by user, the relative message will delete from mysql
		//but will maintain in redis until the user explicitly delete the chatting records
		chats: {
			ouid: {
				friendInfo: {...},
				messages: [{
					sender: Number,
					receiver: Number,
					send_date: Date,
					content: String,
					read: Boolean,
					mid: Number,
				}]
			}
		}

	}

}


message types:
	chat {
		type: "chat",
		sender: Number,
		receiver: Number,
		content: String,
		mid: Number,
		send_date: Date,
	}

	//when user logged in, send all the messages in redis
	chats: {
		type: "chats",
		messages: Array<chat>,
	}

	addFriend {
		type: "addFriend",
		sender: Number,
		receiver: Number,
		messages: String
	}

	comment: {
		type: "comment",
		from: Number,
		to: Number,
		moment_id: Number,
	}

	login {
		type: "login",
		uid: Number,
		chars: Array,
		addFriendMessages: []
	}