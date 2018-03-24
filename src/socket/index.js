import SocketIO from 'socket.io-client'
import Vue from 'vue'

var chat = SocketIO("http://localhost:3000")

chat.on("connect", function() {
	console.log("connect")
})

export default chat