

function _Error (message, code) {
	this.error = {
		message,
		code
	}
}


var WError = new Object()
WError.PERMISSION_DENIED = new _Error("permission denied", 10001)
WError.SYSTEM_ERROR = new _Error("system error", 10002)
WError.INVALID_PASSWORD = new _Error("invalid password", 10003)
WError.WECHATID_EXISTS = new _Error("username already exists", 10004)
WError.INVALID_FORM = new _Error("invalid form", 10005)
WError.SESSION_TIMEOUT = new _Error("登陆过期", 10006)
WError.FILE_UPLOAD_FAILED = new _Error("上传失败", 10007)
WError.INVAID_FILE_TYPE = new _Error("非法的上传文件类型", 10008)
WError.NOT_FOUND = new _Error("未找到", 10007)

module.exports.WError = WError