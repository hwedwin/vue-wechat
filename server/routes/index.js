var express = require('express');
var router = express.Router();
var { login, signup, getUserInfo } = require("../model/user")
var { search } = require('../model/search')
const { WError } = require("../util/global.js")
const fs = require("fs")

router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get("/login", function (req, res,next) {
	console.log(req.session)
	res.send("")
})

router.post("/login", function(req, res, next) {

	let data = req.body
	console.log(data)
	if(!data.wechatId || !data.password) {
		res.send(WError.INVALID_FORM)
	} else {
		console.log(data)
		let wechatId = data.wechatId
		let password = data.password
		login(wechatId, password)
			.then(({user})=>{
				req.session.uid = user.uid
				req.session.wechat_id = user.wechat_id
				req.session.username = user.username
				console.log(req.session.id)
				req.session.save(error=>{
					if(error)
						console.log(error)
					res.send({user})
				})
			}).catch((err)=>{
				res.send(err)
			})
	}
})

router.post("/signup", function(req, res, next) {

	let data = req.body

	if(!data.wechatId || !data.password) {
		res.send(WError.INVALID_FORM.toJSON())
	} else {
		console.log(data)
		let wechatId = data.wechatId
		let password = data.password
		let username = data.username ? data.username : wechatId
		signup(username, password, wechatId)
			.then((data)=>{
				res.send(data)
			})
			.catch((err)=>{
				res.send(err)
			})
	}
})


router.get("/search", function (req, res, next) {
	
	let key = req.query.q
	let uid = req.query.uid
	/*
	if(!this.session.wechatId) {
		res.send(WError.PERMISSION_DENIED)
		return
	} else 
*/
	if(!key || !uid) {
		res.send({})
		return
	}

	search(key, uid)
		.then(data=>{
			res.send(data)
		}).catch(error=>{
			res.send(error)
		})
})

router.get("/image/:filename", function (req, res, next) {
	
	let filename = req.params.filename
	let options = {
		root: "./upload/image"
	}

	res.sendFile(filename, options, (error)=>{
		if(error)
			res.sendStatus(404)
	})
})

router.get("/user/:uid", function (req, res, next) {
	
	let uid = req.params.uid
	getUserInfo(uid)
		.then(data=>{
			if(data)
				res.send({data})
			else
				res.sendStatus(404)
		}).catch(error=> {
			res.send(error)
		})


})

module.exports = router;

