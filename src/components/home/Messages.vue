<template>
	<div>
		<div>
			<mt-header title="微信" fixed>
				<mt-button icon="more" slot="right"></mt-button>
			</mt-header>
		</div>
		<mt-header title="联系人">
			<mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<div>
			<div>
				<search-button></search-button>
			</div>
		</div>

		<div>
			<list-button v-for="item in getMessageList"
				:key="item.friendInfo.uid"
				:text="item.friendInfo.username"
				:headline="item.messages[0].content"
				:img="item.friendInfo.avatar"
				:count="item.unreadCount"
				@click.native="toChat(item.friendInfo.uid)"
			></list-button>

		</div>

	</div>
</template>

<script type="text/javascript">


import { mapGetters } from 'vuex'
import SearchButton from '../element/SearchButton'
import ListButton from '../element/ListButton'

export default {
	name: 'messages',
	components: { SearchButton, ListButton },
	computed: {
		...mapGetters(["getMessageList"])
	},
	methods: {
		toChat(uid) {
			this.$router.push({
				name: "chat",
				params: {
					uid
				}
			})
		}
	}
}

</script>