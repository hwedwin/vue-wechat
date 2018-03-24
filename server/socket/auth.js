var redisClient = require("../redis/client")

module.exports = function (socket) {

	return new Promise(function (resolve, reject) {
			
		console.log("cookie\n\n", socket.handshake.headers.cookie)
		let sid = getSid(socket.handshake.headers.cookie)
		redisClient.get("sess:"+sid, function (error, session) {
			if(error)
				reject(error)
			if(!session)
				resolve(false)
			else
				resolve(true)
		})

	})
}

function getSid(cookie) {
	
	let c = cookie.split(/[ ;]/).find((val)=>{
		if(!val)
			return
		return key = val.split("=")[0] === 'connect.sid'
	})

	if(!c)
		return ;

	let sid = decodeURIComponent(c.split("=")[1]).split(/[.:]/)[1]
	return sid
}