const { WError } = require("../util/global.js")

const pool = require("../db.js");


//limit, after, uid, ouid
function getMessage(uid, ouid) {

	return new Promise(function(resolve, reject) {

		pool.query(`select * from message
			 where (sender = ${uid} or receiver = ${uid}) and 
			 (sender=${ouid} or receiver=${ouid})`, function(error, results, fields) {
			 	console.log(error)
			 	if(error)
			 		reject(WERROR.SYSTEM_ERROR)
			 	else
			 		resolve(results)
			 })
	})
}

function saveMessage(content, sender, receiver) {

	return new Promise(function(resolve, reject) {

		console.log(content, sender, receiver)
		pool.query(String.raw`insert into message values(null, ${sender}, ${receiver}, CURRENT_TIMESTAMP, '${content}')`, (error, results)=>{
			console.log(error)
			if(error)
				reject(WError.SYSTEM_ERROR)
			else{
				console.log(results)
				resolve(results.insertId)
			}
		})

	})
}

function getRecentMessage(limit, after, uid, ouid) {
	return new Promise(function(resolve, reject) {
		pool.query(`select * 
			from message 
			where (sender=${uid} and receiver=${ouid} ) or 
					(sender=${ouid} and receiver=${uid})`, 
			function(error, results, fields) {
				if(error) {
					reject(WError.SYSTEM_ERROR)
				} else {
					resolve(results)
				}
			})
	})
}

module.exports = {
	getMessage,
	saveMessage
}