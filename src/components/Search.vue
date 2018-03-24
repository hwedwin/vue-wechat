<template>

<div>

	<mt-header fixed title="搜索结果">
		<mt-button icon="back" @click="back" slot="left">返回</mt-button>
	</mt-header>
	<mt-header title="搜索结果"></mt-header>
	<div class="SearchUserList" v-if="results.length">
		<div>
			<list-button v-for='(user, index) in results' :key="index"
				v-if="user.uid != me.uid"
				:text="user.username"
				:headline="'微信号：' + user.wechat_id"
				:img="user.avatar"
				@click.native="toUserPage(user.uid)"
			>
				<button slot="button" v-if="!user.isFriend">添加</button>
			</list-button>
		</div>
	</div>
	<div v-else>
		没有搜索结果
	</div>
</div>

</template>

<script type="text/javascript">

import { Indicator } from 'mint-ui';
import ListButton from './element/ListButton'
import { mapState } from 'vuex'


export default {
	name: "search",
	created: function () {
		this.fetchData()
		this.sort()
	},
	components: { ListButton },
	data: function () {
		return {
			results: [],
			done: false,
		}
	},
	computed: {
		...mapState(["me"]),
	},
	mounted: function () {
		if(this.done)
			return
		Indicator.open({
			spinnerType: 'fading-circle'
		});
	},	
	methods: {
		fetchData: function(key) {
			console.log(this.$route)
			this.$http({
				url: "/search",
				params: {
					...this.$route.query,
					uid: this.me.uid
				},
				method: "get"
			}).then(res=>{
				let data = res.data
				if(data.error) {
					console.log(data.error)
				} else if(data.data) {
					this.results = data.data
				}

				this.done = true
				Indicator.close()
			}).catch(error=>{
				Indicator.close()
				console.log(error)
				this.done = true
			})
		},
		toUserPage: function (uid) {
			this.$router.push({
				name: "userpage",
				params: {
					uid
				}
			})
		},
		back: function () {
			this.$router.go(-1)	
		},

		sort: function () {
			this.results.sort((e1, e2)=>{
				if(e1.isFriend && e2.isFriend)
					return 0; 
				if(e1.isFriend)
					return -1;
				if(e2.isFriend)
					return 1;
				return 0
			})

		},
	}
}

</script>