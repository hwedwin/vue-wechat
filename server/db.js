
var mysql = require("mysql")
var pool = mysql.createPool({
	connectionLimit: 20,
	host: "localhost",
	user: "root",
	password: "",
	database: "wechat"
})

pool.on("error", function (error) {
	console.log(error)
})

module.exports = pool