<template>
	<view class="noData">
		<image src="/static/img/notFound.png"></image>
		<text class="desc" :style="{ color: viceColor }">{{viceText}}</text>
	</view>
</template>

<script>
	export default {
		props: {
			isShow: {
				type: Boolean,
				default: false
			},
			viceText: {
				type: String,
				default: '暂无数据'
			},
			viceColor: {
				type: String,
				default: '#8b8b8b'
			}
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.noData {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
	}
	
	.noData image {
		position: relative;
		width: 187upx;
		height: 187upx;
		margin-bottom: 20upx;
	}
	
	.noData .content {
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		letter-spacing: 1upx;
	}
	
	.noData .content .desc {
		font-size: 28upx;
		margin-top: 6upx;
	}
</style>