<template>
	<view class="content">
		<view class="item" v-for="item in list" :key="item.id">
			<navigator :url="`/pages/list/list?category_id=${item.id}`">
				<h1>{{item.title}}</h1>
				<p>{{item.desc}}</p>
				<image :src="item.cover" mode=""></image>
			</navigator>
		</view>
		<emptyData v-if="!list.length" />
	</view>
</template>

<script>
	import { getList } from '../../api/home.js';

	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList() {
				getList({
					currentPage: 1,
					pageSize: 50
				}).then(data => {
					this.list = data.list;
				});
			}
		},
		onLoad() {
			this.getList();
		}
	}
</script>

<style>
	.content {
		padding: 30upx;
	}
	
	.item {
		background-color: #FFFFFF;
		padding: 30upx 110upx 30upx 22upx;
		position: relative;
		box-shadow: 0 2px 9px 1px rgba(4, 0, 0, 0.03);
		margin-bottom: 30upx;
	}
	
	.item:last-child {
		margin: 0;
	}
	
	h1 {
		font-size: 26upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
	}
	
	p {
		font-size: 18upx;
		margin-top: 10upx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: normal;
	}
	
	image {
		position: absolute;
		right: 42upx;
		top: 30upx;
		width: 92upx;
		height: 80upx;
	}
</style>
