var app = require("./app")
const http = require("http")

var server = http.createServer(app);


module.exports = server