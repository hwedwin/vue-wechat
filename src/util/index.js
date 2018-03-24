
const validWechatIdChars = new Set([..."qwertyuiopasdfghjklzxcvbnm_1234567890"])

export function wechatIdCheck(wechatId) {

	for(let i = 0; i < wechatId.length; ++i) {
		if(!validWechatIdChars.has(wechatId[i]))
			return false
	}

	return true
}


export function randomToken() {

	return (Math.random()*12345679).toString(36)

}

