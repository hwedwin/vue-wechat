<template>

<div :class="type" ref="button" class="plain-button"><div>{{ text }}</div></div>

</template>

<script type="text/javascript">
	
export default {
	name: "plainButton",
	props: {
		type: {
			type: String,
			default: "plain",
		},
		text: {
			type: String,
			required: true,
		},
		background: {
			type: String,
		}
	},
	mounted: function () {
		if(this.background) {
			console.log(this.background)
			this.$refs.button.style['background-color'] = this.background
			this.$refs.button.style.color = "white"
		}
	}
}

</script>

<style type="text/css">


.plain-button {
	height: 100%;
	min-width: 50px;
	text-align: center;
	display: inline-block;
	border:none;
	border-radius: 3px;
	line-height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 5px;
	padding-left: 5px;
}




</style>