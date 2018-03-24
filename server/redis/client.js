
var redis = require("redis")
var _client = redis.createClient(6379, '127.0.0.1')

module.exports = _client