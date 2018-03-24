var express = require('express');
var router = express.Router();
const pool = require("../db.js")
const { WError } = require("../util/global.js")

function login(wechatId, password) {

	return new Promise(function(resolve, reject) {

		pool.query(String.raw`select * from user where wechat_id='${wechatId}' and password='${password}'`, 
			function(error, results, fields) {
				console.log(error)
				if(error)
					reject(WError.SYSTEM_ERROR)
				if(!results || results.length === 0)
					reject(WError.INVALID_PASSWORD)
				else
					resolve({user: results[0]})
		})

	})
}

function signup(username, password, wechatId, gender = 0, avatar="default avatar", region = "") {

	console.log(String.raw`insert into user values (null, '${wechatId}', '${password}', '${username}', 
			${gender}, '${avatar}', '${region}', CURRENT_TIMESTAMP)`)
	return new Promise(function (resolve, reject) {
		pool.query(String.raw`insert into user values (null, '${wechatId}', '${password}', '${username}', 
			${gender}, '${avatar}', '${region}', CURRENT_TIMESTAMP)`, 
			function(error, results, fields) { 
				console.log(error)
				if(error) {
					if(error.code === 'ER_DUP_ENTRY')
						reject(WError.WECHATID_EXISTS)
					else
						reject(WError.SYSTEM_ERROR)
				}
				console.log("results", results)
				if(!results || !results.insertId)
					reject(WError.INVALID_PASSWORD)
				else
					resolve({user: results.insertId})
			})
	})
}

function addFriend(uid, ouid) {

	return new Promise(function(resolve, reject) {
		pool.query(String.raw`insert into friend values(${uid}, ${ouid}, CURRENT_TIMESTAMP, true)`, 
			function(error, results, fields) {
				if(error)
					reject(WError.SYSTEM_ERROR)
				else
					resolve(results)
			})
	})
}

function deleteFriend(uid, ouid) {
	return new Promise(function(resolve, reject) {
		pool.query(String.raw`delete from friend where (fid_1=${uid} and fid_2=${ouid}) 
			or (fid_2=${uid} and fid_1=${ouid})`,
			function(error, results, fields) {
				if(error)
					reject(WError.SYSTEM_ERROR)
				else
					resolve(results)
			})
	})
}


function getUserInfo(uid) {

	return new Promise(function (resolve, reject) {
		pool.query(`select * from user where uid=${uid}`
			,function (error, results, fields) {
				if(error){
					console.log(error)
					reject(WError.SYSTEM_ERROR)
				}
				else
					resolve(results.length > 0 ? results[0] : null)
			})

	})
}


function getFriends(uid) {
	return new Promise(function (resolve, reject) {
		pool.query(`select * from user where (uid in (select fid_1 from
		friend where fid_2=${ uid })
		or uid in (select fid_2 from friend where fid_1=${uid}))
		and uid != ${uid}`
			,function (error, results, fields) {
				if(error) {
					console.log(error)
					reject(WError.SYSTEM_ERROR)
				} else {
					resolve(results)
				}
			})
	})
}


module.exports = {
	login,
	signup,
	getUserInfo,
	getFriends,
	addFriend
}
