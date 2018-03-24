<template>

<div class="search-button-wrapper"
	@click="toggleSearch">
	<button class="search-button">
		<div class="search-button-icon">
			<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1521372970287" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" p-id="4055" width="200" height="200"><path d="M938.670589 832.937476 724.072023 618.264209c-2.493797-2.481518-5.266957-4.377704-7.883551-6.445806 36.231179-55.625902 57.400315-121.893164 57.400315-193.285145 0-196.1064-158.901033-355.056552-355.045295-355.056552-196.033745 0-355.056552 158.951175-355.056552 355.056552 0 196.130959 159.022807 355.044272 355.056552 355.044272 71.342862 0 137.697105-21.216207 193.404871-57.471946 2.033309 2.700505 3.894703 5.376451 6.351662 7.836479l214.636429 214.69578c14.635325 14.610766 33.736359 21.886473 52.850695 21.886473 19.122523 0 38.223556-7.275707 52.859905-21.851681C967.797977 909.451104 967.797977 862.134449 938.670589 832.937476M418.543492 661.46615c-133.911896 0-242.933915-108.996436-242.933915-242.933915 0-133.912919 109.020996-242.946194 242.933915-242.946194 133.912919 0 242.921635 109.033275 242.921635 242.946194C661.465127 552.469714 552.456411 661.46615 418.543492 661.46615" p-id="4056" fill="#8a8a8a"/></svg>
		</div>
		<div>{{text}}</div>
	</button>
</div>


</template>

<script type="text/javascript">

export default {
	name: "searchButton",
	props: {
		text: {
			type:String,
			default: "搜索"
		}
	},
	data: function () {
		return {

		}
	},

	methods: {
		toggleSearch() {
			this.$store.commit("toggleSearching")
		}
	}
}

</script>

<style type="text/css">

.search-button-wrapper {
	padding: 10px;
	background-color: #ececec;
}

.search-button {
	width: 100%;
	height: 2.4em;
	display: inline-flex;
	color: #8a8a8a;
	justify-content: center;
	background-color: white;
	border: none;
	border-radius: 5px;
	outline: none;
}

.search-button-icon {
	height: 16px;
	width: 16px;
}

.search-button-icon > * {
	height: 100%;
	width: 100%;
	display: block;
}

</style>
