const pool = require("../../db.js")
const { WError } = require("../util/global.js")


function postMoment(uid, content, images) {

	return new Promise(function(resolve, reject){

		pool.query(`insert into moment values
			(null, ${uid}, '${content}', '${images}', CURRENT_TIMESTAMP)`, 
			function(error, result, fields) {

				if(error)
					reject(error)
				else
					resolve(result)
			})
	})
}

function getMoments(limit, after, uid) {
	return new Promise(function (resolve, reject) {
		pool.query(`
			select * from moment
			where (uid in (
				select fid_1 from friend where fid_2 = ${uid} )
			or uid in (
				select fid_2 from friend where fid_1 = ${uid}))
			and mid < ${after}
			order by post_date limit 0, ${limit} `,
			function (error, result, fields) {
				if(error)
					reject(error)
				else
					resolve(result)
			})
	})
}


function getMomentComments(uid, mid) {

	pool.query(`select * from moment_comment
			where (uid in (
				select fid_1 from friend where fid_2 = ${uid} )
			or uid in (
				select fid_2 from friend where fid_1 = ${uid}))`)

}


