<template>

<div ref="search" class="search-box">
	<div class="search-box-main">
		<input type="text" name="key"
			@keyup.enter="directSearch($event.target.value)"
			@input="updateValue" 
			@focus="toggleCancel"
			@blur="toggleCancel"
			:value='value'
			:placeholder="placeHolder"
			autofocus="true">
		<button ref="cancelBtn"
			v-if="showButton"
			@click="cancelSearch">{{ cancelText }}</button>
	</div>
	<div>
		
	</div>
</div>

</template>


<script type="text/javascript">

const querystring = require("querystring")


export default {
	name: "search",
	props: {
		cancelText: {
			type: String,
			default: "取消",
		},
		placeHolder: {
			type: String,
			default: "搜索"
		},
		value: {
			type:String,
			default: ""
		},
		url: {
			type: String,
			default: '/search'
		}
	},
	data: function(){
		return {
			showButton: true,
		}
	},
	methods: {
		updateValue: function (event) {
			let value = event.target.value.trim()
			if(value != event.target.value)
				event.target.value = value

			this.$emit("input", value)

		},
		toggleCancel: function () {
			this.showButton = !this.showButton
		},
		cancelSearch: function () {
			this.$store.commit("toggleSearching")
		},
		directSearch: function (key) {
			let query = querystring.stringify({q: key})
			this.$router.replace("/search?" + query)
		}
	},

}

</script>

<style type="text/css">

.search-box {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 10000;
	background-color: rgb(240, 240, 240);
}

.search-box-main {
	padding: 8px;
	background-color: rgb(235, 235, 235);
	border-bottom: 1px solid rgb(230, 230, 230);
	display: flex;
	align-items: stretch;
}

.search-box-main input {
	flex: 1;
	padding: 6px;
	border: 1px solid rgb(200, 200, 200);
	outline: none;
}

.search-box-main button {
	background-color: transparent;
	border:none;
	color:  #09bb07;
	margin-left: 5px;
	margin-right: 5px;
}

</style>