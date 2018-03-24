
var server = require("../server")
var socket = require("socket.io")(server)
var redis = require("../redis/index")
var { getUserInfo, addFriend } = require("../model/user")
var { saveMessage } = require("../model/message")
var initClientSocket = require("./client")

socket.on("connect", function(client) {

	console.log(client.session)
	initClientSocket(client, socket)
})

module.exports = socket