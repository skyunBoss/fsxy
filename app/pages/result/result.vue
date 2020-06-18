<template>
	<view class="content">
		<image src="../../static/img/success.jpeg" mode="" v-show="detail.status === 1"></image>
		<image src="../../static/img/wait.jpg" mode="" v-show="detail.status === 0"></image>
		<text v-if="detail.status === 0">正在审核，请耐心等待...</text>
		<view v-else>
			<text>审核成功</text>
			<text>预约单位：{{detail.unit}}</text>
			<text>预约时间: {{detail.date}}</text>
		</view>
	</view>
</template>

<script>
	import { getDetail } from '../../api/examination.js';
	
	export default {
		data() {
			return {
				detail: {}
			}
		},
		methods: {
			getDetail() {
				getDetail({
					user_id: 1
				}).then(data => {
					this.detail = data;
				});
			}
		},
		onLoad() {
			this.getDetail();
		}
	}
</script>

<style>
	.content {
		text-align: center;
	}
	
	image {
		width: 200upx;
		height: 200upx;
		margin: 60upx auto;
	}
	
	text {
		display: block;
		margin-bottom: 20upx;
	}
</style>
