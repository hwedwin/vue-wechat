var _client = require("./client")

module.exports.set = function(key, value, replaceAll = true) {
	return new Promise(function(resolve, reject) {

		_client.get(key, function(error, data) {

			if(error)
				reject(error)
			
			data = JSON.parse(data ? data : "{}")

			for(let k in value) {

				if(replaceAll || data[k] === undefined || (typeof data[k] !== 'object'))
					data[k] = value[k]
				else {

					if(data[k] instanceof Array) {
						data[k] = data[k].concat(value[k])
					} else {
						data[k] = value[k]
					}
				}
			}

			_client.set(key, JSON.stringify(data), function(error) {
				if(error)
					reject(error)
				else
					resolve(data)
			})

		})

	})
} 

module.exports.get = function(key) {
	return new Promise(function(resolve, reject) {

		_client.get(key, function(error, data) {
			if(error)
				reject(error)
			else
				resolve(JSON.parse(data ? data : "{}"))
		})

	})
}

