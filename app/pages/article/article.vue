<template>
	<view class="content" v-html="detail.content"></view>
</template>

<script>
	import { getDetail } from '../../api/article.js';
	
	export default {
		data() {
			return {
				detail: {}
			}
		},
		methods: {
			getDetail(id) {
				getDetail({
					id
				}).then(data => {
					this.detail = data;
					
					uni.setNavigationBarTitle({
						title: data.title
					});
				});
			}
		},
		onLoad({ id }) {
			this.getDetail(id);
		}
	}
</script>

<style>
	.content {
		text-align: justify;
	}
</style>
