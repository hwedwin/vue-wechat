
const pool = require("../db.js")
const { WError } = require("../util/global.js")

function search(key, uid) {
	return new Promise((resolve, reject)=>{

		if(typeof key === 'string')
			key = String.raw`${key}`
		else if(key instanceof Array) {
			let temp = ""
			for(let i = 0; i < key.length; ++i)
				temp += key[i] + '%'
			key = temp
		} else {
			reject({error: new Error("invalid parameter")})
		}

		let sql = `select b.*, ifNULL(b.f, 0) + ifNULL(c.uid, 0) as isFriend
					from
					(select user.* , coalesce(a.uid, 0) as f
					from
					user
					left join 
					(select fid_2 as  uid from friend where fid_1 = ${ uid }) as a
					on user.uid = a.uid) as b 
					left join 
					(select fid_1 as  uid from friend where fid_2 = ${ uid }) as c 
					on b.uid = c.uid
					where b.username like "%${key}%"`

		pool.query(sql, function(error, results, fields){
			console.log(error)
			console.log(results)
			if(error)
				reject(WError.SYSTEM_ERROR)
			else
				resolve({data: results})
		})
	})
}


module.exports = {
	search
}
