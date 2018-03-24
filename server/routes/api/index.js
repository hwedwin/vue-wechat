var express = require('express');
var router = express.Router();
var querystring = require("querystring")
var { WError } = require("../../util/global")
var { getFriends, getUserInfo } = require("../../model/user")
var { getMessage } = require("../../model/message")

router.get("/friend", function (req, res) {
	
	/*
		if(!req.session.uid) {
			res.send(WError.PERMISSION_DENIED)
			return
		}
	*/

	let uid = req.query.uid

	if(uid instanceof Array) uid = uid[0];

	getFriends(uid)
		.then(data=>{
			res.send({ data })
		}).catch(error=> {
			res.send({ error })
		})

})


router.get("/moments", function (req, res) {
	//todo

	res.send("todo")
})


router.get("/message", function(req, res) {
	
	let uid = req.query.uid
	let ouid = req.query.ouid

	getMessage(uid, ouid)
		.then(data=>{
			res.send({data})
		}).catch(error=>{
			res.send(error)
		})

})

router.get("/user/:uid", function (req, res) {
	let uid = req.params.uid

	getUserInfo(uid)
		.then(data=>{
			//todo: add isFriend property
			res.send(data)
		}).catch(error=>{
			res.send(error)
		})

})


module.exports = router;
