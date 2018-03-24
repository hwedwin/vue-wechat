
import lockr from 'lockr'

export default {
	isLoggedIn() {
		return !!lockr.get("user")
	}
}