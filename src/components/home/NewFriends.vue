<template>
	<div class="newfriends">
		<div>
			<mt-header title="新的好友" fixed>
				<mt-button icon="back" slot="left" @click.native="goback"></mt-button>
			</mt-header>
		</div>
		<mt-header title="联系人">
			<mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<search-button text="微信号"></search-button>
		<div>
			<list-button v-for="msg in addFriendMessages" 
				:text="msg.userInfo.username"
				:img="msg.userInfo.avatar"
				:key="msg.userInfo.wechat_id"
				:headline="'微信号：' + msg.userInfo.wechat_id">
				<plain-button slot="button"
					:text="!msg.userInfo.isFriend ? '待确认' : '已添加'"
					background="#26a2ff"
					@click.native="confirmAddRequest(msg.user.uid)"></plain-button>
			</list-button>
		</div>
	</div>
</template>

<script type="text/javascript">

import ListButton from '../element/ListButton'
import PlainButton from '../element/PlainButton'
import SearchButton from '../element/SearchButton'
import { mapState } from 'vuex'

export default {
	name:"newFriends",
	components: { ListButton, PlainButton, SearchButton },
	computed: {
		...mapState(["addFriendMessages"])
	},
	mounted: function() {

		this.$store.commit("readAddFriendMessage")

	},
	methods: {
		confirmAddRequest: function(uid) {

			this.$socket.emit("send", {
				type: "confirmAddRequest",
				from: this.$lockr.get("user").uid,
				to: uid
			})

		},
		goback: function () {
			this.$router.go(-1)
		}
	},
	created: function () {


	}
}

</script>