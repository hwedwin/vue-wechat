
<template>

<div class="dialogue">
	<div :class="type">
		<div class="dialogue-avatar">
			<img :src="user.avatar" v-if="type === 'from'">
		</div>
		<div class="dialogue-content">
			<div class="dialogue-content-text">
				<div>
					{{ content }}				
				</div>

			</div>
		</div>
		<div class="dialogue-avatar">
			<img :src="user.avatar" v-if="type === 'to'">
		</div>
	</div>

</div>

</template>

<script type="text/javascript">

export default {
	name: "dialogue",
	props: {
		type: {
			type: String,
			default: "to",
			validator: (val)=>{
				return val === "from" || val === "to"
			}
		},
		user: {
			type: Object,
			required: true
		},
		content: {
			type: String,
			required: true,
		}
	},

}

</script>

<style type="text/css">

.dialogue > div {
	display: flex;
	padding: 10px;
}

.dialogue-avatar {
	height: 50px;
	width: 50px;
	border-radius: 3px;
	box-shadow: 1px 1px 1px rgba(200, 200, 200, 0.1);
}

.dialogue-avatar img {
	height: 100%;
	width: 100%;
	background-color: white;
}

.dialogue-content {
	flex: 1;
	margin: 0 15px 0 15px;
	display: flex;
	align-items: center;
}

.dialogue-content-text {

	display: flex;
}

.dialogue-content-text div {
	border-radius: 5px;
	word-wrap: break-word;
	word-break: break-all;
	text-align: left;
	padding: 0.5em;
}

.to .dialogue-content-text div {
	background-color: #09bb07;
}

.to .dialogue-content  {
	justify-content: flex-end;
}

.to .dialogue-content-text div {
	align-self: flex-end;
}

.from .dialogue-content-text div {
	background-color: #ececec;
}


.sending .dialogue-content-text::before {
	content: url(../../assets/chat-sending.gif);
	height: 12px;
	align-self: center;
	padding-right: 3px;
}

</style>