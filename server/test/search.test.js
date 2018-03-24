
const {search} = require('../model/search')


search("a").then(data=>{
	console.log(data)
}).catch(error=>{
	console.log(error)
})