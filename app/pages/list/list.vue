<template>
	<view class="content">
		<uni-list>
			<uni-list-item
				v-for="item in list"
				:key="item.id"
				:title="item.title"
				@click="handleLink(item.id)"
			/>
		</uni-list>
		<emptyData v-if="!list.length" />
	</view>
</template>

<script>
	import { getList } from '../../api/article.js';
	
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList(category_id) {
				getList({
					category_id,
					currentPage: 1,
					pageSize: 50
				}).then(data => {
					this.list = data.list;
				});
			},
			handleLink(id) {
				uni.navigateTo({
					url: `/pages/article/article?id=${id}`
				});
			}
		},
		onLoad({ category_id }) {
			this.getList(category_id);
			
			uni.setNavigationBarTitle({
				title: "辐射防护基础知识"
			});
		}
	}
</script>

<style>
	.content {
		padding: 0;
	}
	
	.uni-list {
		background: none;
	}
	
	.uni-list-item__container {
		padding: 15upx;
	}
</style>
