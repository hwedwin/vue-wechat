<template>

<div>
	<div>
		<mt-header title="联系人" fixed>
			<mt-button icon="more" slot="right" @click="searchUser"></mt-button>
		</mt-header>
	</div>
	<mt-header title="联系人">
		<mt-button icon="more" slot="right"></mt-button>
	</mt-header>
	<div>
		<search-button></search-button>
	</div>
	<div>
		<list-button
			img="../../static/image/new-friends.png"
			text="新的好友"
			@click.native="toNewFriends"
			:count="getUnreadAddFriendMsgCount"
		></list-button>
		<list-button
			img="../../static/image/official-accounts.png"
			text="公众号"
		></list-button>
	</div>
	<div class="placeholder-div"></div>
	<div v-if="getFriends.length">
		<list-button v-for="(fri, idx) in getFriends"
			:key="fri.uid"
			:img="fri.avatar"
			:text="fri.username"
			@click.native="toUserPage(fri.uid)"
		></list-button>
	</div>
	<div v-else>
		你还没有好友
	</div>

</div>

</template>

<script type="text/javascript">

import SearchButton from '../element/SearchButton'
import ListButton from '../element/ListButton'
import { mapGetters, mapState } from 'vuex'

export default {
	name: 'contacts',
	components: { SearchButton, ListButton },
	data: function () {
		return {
			searchKey: "",
			search: false,
		}
	},
	computed: {
		...mapGetters(["getUnreadAddFriendMsgCount", "getFriends"]),
	},
	created: function () {
	},
	methods: {
		searchUser: function() {
			this.$router.push("/wechat/search")
		},
		toNewFriends: function() {
			console.log("click")
			this.$router.push("/wechat/newfriends")
		},
		toUserPage: function (uid) {
			this.$router.push({
				name: "userpage",
				params: {
					uid,
				}
			})
		}
	}
}

</script>