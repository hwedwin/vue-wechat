<template>

<div class="list-button">
	<div :class="type">
		<div class="list-button-inner">
			<img :src="img">
			<div class="list-button-text">
				<div class="list-button-text-text">{{ text }}</div>
				<div class="list-button-headline" v-if="headline">{{ headline }}</div>
			</div>
			<div class="list-button-count" v-if="count">
				<svg height="40" width="40" viewBox="0 0 40 40" version="1.1"
				xmlns="http://www.w3.org/2000/svg">
				<circle cx="20" cy="20" r="20" fill="red"/>
				</svg>
				<div class="list-button-count-number">{{ count | border }}</div>
			</div>
			<div class="list-button-icon">
				<slot name="icon"></slot>
			</div>
			<div class="list-button-handler">
				<slot name='button'></slot>
			</div>
			<div class="list-button-time" v-if="time">
				{{ time | relative }}
			</div>
		</div>
	</div>	
</div>


</template>

<script type="text/javascript">

export default {
	name: "listButton",
	props: {
		img: {
			type: String,
			required: true
		},
		text: {
			type: String,
			required: true
		},
		headline: {
			type: String,
		},
		time: {
			type: Number,
		},
		type: {
			type: String,
			default: "middle"
		},
		count: {
			type: Number,
			default: 0,
		}
	},
	filters: {
		relative: function (value) {
			let date = new Date(value)
			let now = new Date()

			if(date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
				&& date.getDate() === now.getDate()) {
				return date.getHours() + ":" + date.getMinutes()
			}

			if(date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()
				&& date.getDate() + 1 === now.getDate())
				return "昨天"//

			return date.getFullYear() + "/" + date.getMonth() + 1 + "/" + date.getDate()
		},
		border: function (value) {
			if(value > 99)
				return "99+"
			return value
		}
	}
}

</script>

<style type="text/css">

.list-button:last-child .list-button-inner {
	border: none;
}

.list-button {
	background-color: white;
	padding-top: 8px;
}

..list-button * {
	box-sizing: border-box;
}

.list-button-inner {
	border-bottom: 1px solid lightgrey;
	margin: 0 8px 0 8px;
	display: flex;
	position: relative;
	padding-bottom: 8px;
	align-items: center;
	overflow: hidden;
}

.list-button-inner img {
	height: 42px;
	width: 42px;
	padding-right: 8px;
	display: block;
}

.list-button .middle img {
	height: 42px;
	width: 42px;
}

.list-button .large img {
	height: 48px;
	width: 48px;
}

.list-button .small img {
	height: 36px;
	width: 36px;
}

.list-button-count {
	align-items: center;
	position: relative;
	display: flex;
}

.list-button .middle .list-button-count svg {
	height: 32px;
	width: 32px;
}

.list-button-count-number {
	color: white;
	font-weight: bold;
	position: absolute;
	height: 1em;
	left:0; right:0; top:0; bottom:0;
	margin:auto;
}


.list-button-text {
	flex: 1;
	display: flex;

	flex-direction: column;
	justify-content: center;
}

.list-button-text-text {
	display: flex;
	align-items: center;

}

.list-button-headline {

	align-items: center;
	display: flex;
	overflow: hidden;
	white-space: nowrap;
}

.list-button-time {
	position: absolute;
	top: 0;
	right: 6px;
	font-size: 0.6em;
	font-size: grey;
}



.list-button-headline {
	font-size: 0.8em;
	color: grey;
}

.list-button-icon * {
	height: 20px;
	width: 20px;
}

.list-button-icon {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.list-button-handler {
	height: 36px;
	align-items: center;
	display: flex;
}


</style>