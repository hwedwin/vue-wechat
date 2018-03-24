
var equals = function (e1, e2) {

	if(typeof e1 === typeof e2) {

		let type = typeof e1

		if(type === 'number') {
			return (isNaN(e1) && isNaN(e2)) || e1 === e2
		}

		if(type === 'object') {

			for(let key of Object.keys(e1)) {
				console.log("key"+key)
				if(!equals(e1[key], e2[key]))
					return false
			}

			for(let key of Object.keys(e2)) {
				if(!equals(e2[key], e1[key]))
					return false
			}

			return true
		}
		return e1 === e2
	} else {
		return false
	}

}

function generateId() {
	return (Math.random()*123123131).toString(35)
}

module.exports = {
	generateId,
	equals
}