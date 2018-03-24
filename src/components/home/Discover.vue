<template>
	
	<div>
		<div>
			<mt-header title="发现" fixed>
			</mt-header>
		</div>
		<mt-header title="联系人">
			<mt-button icon="more" slot="right"></mt-button>
		</mt-header>
		<div class="placeholder-div"></div>
		<div class="card">
			<list-button text="朋友圈" img="../../static/image/moments.png"
				type="small">
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" t="1521385082869" viewBox="0 0 1024 1024" version="1.1" p-id="10125" width="200" height="200" 
						slot="icon"><path d="M318.73024 836.32128c3.9936 3.9936 9.23648 6.00064 14.47936 6.00064s10.48576-2.00704 14.47936-6.00064l307.2-307.2c8.00768-8.00768 8.00768-20.95104 0-28.95872l-307.2-307.2c-8.00768-8.00768-20.95104-8.00768-28.95872 0s-8.00768 20.95104 0 28.95872l292.72064 292.72064L318.73024 807.36256C310.72256 815.37024 310.72256 828.33408 318.73024 836.32128z" p-id="10126" fill="#8a8a8a"/></svg>
				</list-button>			
		</div>

	</div>

</template>

<script type="text/javascript">

import SearchButton from '../element/SearchButton'
import ListButton from '../element/ListButton'

export default {
	name: 'contacts',
	components: { SearchButton, ListButton },
}

</script>

<style type="text/css">



.card {
	box-shadow: 0 1px 3px rgba(26,26,26,.1);
}

</style>
