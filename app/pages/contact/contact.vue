<template>
	<view class="content">
		<h1>欢迎联系我们</h1>
		<view class="item" v-for="item in list" :key="item.id">
			<view class="label">
				{{item.label}}：
			</view>
			<view class="value">
				{{item.value}}
			</view>
		</view>
	</view>
</template>

<script>
	import { getList } from '../../api/contact.js';
	
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
	
	h1 {
		color: #6155e7;
		font-size: 34upx;
	}
	
	.item {
		margin-top: 40upx;
		line-height: 20upx;
		font-size: 28upx;
	}
	
	.label {
		width: 20%;
		float: left;
		text-align: right;
	}
	
	.value {
		width: 80%;
		float: left;
	}
</style>
