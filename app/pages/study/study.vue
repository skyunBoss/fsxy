<template>
	<view id="moments">
		<view class="moments__post" v-for="item in list" :key="item.id">
			<view class="post-left">
				<image class="post_header" :src="item.head"></image>
			</view>

			<view class="post_right">
				<text class="post-username">{{item.username}}</text>
				<view id="paragraph" class="paragraph">{{item.content}}</view>
				<!-- 相册 -->
				<view class="thumbnails">
					<view class="my-gallery">
						<image class="gallery_img" lazy-load mode="aspectFill" :src="item.image" :data-src="item.image" @tap="previewImage(item.image)"></image>
					</view>
				</view>
				<!-- 资料条 -->
				<view class="toolbar">
					<view class="timestamp">{{dateStr(item.updated_at)}}</view>
				</view>
			</view>
			<!-- 结束 post -->
		</view>
		
		<emptyData v-if="!list.length" />

		<view class="uni-loadmore" v-if="showLoadMore" style="text-align: center;">{{loadMoreText}}</view>

		<uni-fab :pattern="pattern" horizontal="right" :popMenu="false" @fabClick="goPublish" />
	</view>
</template>

<script>
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import { getList } from '../../api/comment.js';

	export default {
		components: {
			uniFab
		},
		data() {
			return {
				list: [],
				currentPage: 1,
				user_id: 4,
				username: 'Liuxy',
				index: '',
				comment_index: '',
				input_placeholder: '评论', //占位内容
				focus: false, //是否自动聚焦输入框
				is_reply: false, //回复还是评论
				showInput: false, //评论输入框
				screenHeight: '', //屏幕高度(系统)
				platform: '',
				windowHeight: '', //可用窗口高度(不计入软键盘)
				loadMoreText: '加载中...',
				showLoadMore: false,
				pattern: {
					buttonColor: '#6155e7'
				}
			}
		},
		mounted() {
			this.getList();
		},
		onLoad() {
			uni.getSystemInfo({ //获取设备信息
				success: (res) => {
					this.screenHeight = res.screenHeight;
					this.platform = res.platform;
				}
			});
			uni.startPullDownRefresh();
		},
		onShow() {
			uni.onWindowResize((res) => { //监听窗口尺寸变化,窗口尺寸不包括底部导航栏
				if (this.platform === 'ios') {
					this.windowHeight = res.size.windowHeight;
					this.adjust();
				} else {
					if (this.screenHeight - res.size.windowHeight > 60 && this.windowHeight <= res.size.windowHeight) {
						this.windowHeight = res.size.windowHeight;
						this.adjust();
					}
				}
			});
		},
		onHide() {
			uni.offWindowResize(); //取消监听窗口尺寸变化
		},
		onUnload() {
			this.max = 0;
			this.data = [];
			this.loadMoreText = "加载更多";
			this.showLoadMore = false;
		},
		onReachBottom() { //监听上拉触底事件
			console.log('onReachBottom');
			this.showLoadMore = true;
			setTimeout(() => {
				//获取数据
				this.getList();
			}, 1000);
		},
		onPullDownRefresh() { //监听下拉刷新动作
			console.log('onPullDownRefresh');
			// 这里获取数据
			setTimeout(function() {
				//初始化数据
				uni.stopPullDownRefresh(); //停止下拉刷新
			}, 1000);
		},
		methods: {
			previewImage(image) {
				uni.previewImage({
					current: 1,
					urls: [image]
				});
			},
			goPublish() {
				uni.navigateTo({
					url: '/pages/publish/publish'
				});
			},
			getList() {
				getList({
					currentPage: this.currentPage || 1,
					pageSize: 2
				}).then(data => {
					if (!data.list.length) {
						this.loadMoreText = "暂无更多";
					}
					
					this.currentPage += 1;
					this.list = this.list.concat(data.list);
				});
			},
			/**
			 * 毫秒转换友好的显示格式
			 * 输出格式：21小时前
			 * @param  {[type]} time [description]
			 * @return {[type]}      [description]
			 */
			dateStr(date) {
			    //获取js 时间戳
			    var time=new Date().getTime();
				date=new Date(date).getTime();
			    //去掉 js 时间戳后三位，与php 时间戳保持一致
			    time=parseInt((time-date*1000)/1000);
			
			    //存储转换值 
			    var s;
			    if(time<60*10){//十分钟内
			        return '刚刚';
			    }else if((time<60*60)&&(time>=60*10)){
			        //超过十分钟少于1小时
			        s = Math.floor(time/60);
			        return  s+"分钟前";
			    }else if((time<60*60*24)&&(time>=60*60)){ 
			        //超过1小时少于24小时
			        s = Math.floor(time/60/60);
			        return  s+"小时前";
			    }else if((time<60*60*24*3)&&(time>=60*60*24)){ 
			        //超过1天少于3天内
			        s = Math.floor(time/60/60/24);
			        return s+"天前";
			    }else{ 
			        //超过3天
			        var date= new Date(parseInt(date) * 1000);
			        return date.getFullYear()+"/"+(date.getMonth()+1)+"/"+date.getDate();
			    }
			}
		}
	}
</script>

<style scoped>
	.liked {
		position: relative;
		margin-right: 10upx;
		width: 34upx;
		height: 34upx;
	}

	.post-username {
		font-size: 32upx;
		font-weight: 600;
		color: #36648B;
	}

	.gallery_img {
		width: 100%;
		height: 100%
	}

	.header {
		width: 100%;
		height: 100%;
		z-index: 10;
		border-radius: 40upx;
	}

	.publish {
		position: absolute;
		top: 20upx;
		right: 20upx;
	}

	.post_header {
		width: 90upx !important;
		height: 90upx !important;
		border-radius: 10upx;
		margin-top: 8upx;
	}

	#moments {
		width: 100%;
		background: #fff;
	}

	#moments .moments__post {
		background: #fff;
		display: block;
		border-bottom: 1px solid #f2eeee;
		padding: 30upx 20upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
	}

	#moments .moments__post::before {
		content: none
	}

	#moments .moments__post .post_right {
		font-size: 32upx;
		display: table-cell;
		padding-left: 20upx;
		width: 100%;
	}

	#moments .moments__post .title {
		color: #094dcc
	}

	#moments .moments__post .thumbnails {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		/* display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox; */
		/* -webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap; */
	}

	#moments .moments__post .thumbnails .thumbnail {
		width: 30%;
		height: 180upx;
		margin: 4upx;
		background: #757575;
		overflow: hidden;
	}

	.my-gallery {
		width: 250upx;
		height: 400upx;
		margin: 4upx;
		background: #757575;
		overflow: hidden
	}

	#moments .moments__post .toolbar {
		position: relative;
		top: 10upx;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center
	}

	#moments .moments__post .toolbar .timestamp {
		color: #757575;
		font-size: 22upx;
	}


	#moments .moments__post .like {
		width: auto;
		height: auto;
		position: absolute;
		right: 60upx;
		display: flex;
		align-items: center;
	}

	#moments .moments__post .comment {
		width: auto;
		height: auto;
		position: absolute;
		right: 0upx;
		display: flex;
		align-items: center;
	}

	#moments .moments__post .toolbar image {
		padding-left: 20upx;
		width: 40upx;
		height: 40upx;
	}

	.post-footer {
		margin-top: 30upx;
		background-color: #f3f3f5;
		width: 100%;
	}

	#moments .moments__post .footer_content {
		padding-left: 10upx;
		position: relative;
		display: -webkit-box;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		-ms-flex-align: center;
		align-items: center;
		-webkit-flex-wrap: wrap;
		-ms-flex-wrap: wrap;
		flex-wrap: wrap
	}

	#moments .moments__post .footer_content .nickname {
		color: #36648B;
		font-size: 24upx
	}

	#moments .moments__post .footer_content .comment-nickname {
		color: #36648B;
		font-size: 24upx
	}

	#moments .moments__post .footer_content .comment-content {
		color: #000000;
		font-size: 24upx
	}

	.foot {
		position: fixed;
		width: 100%;
		height: 90upx;
		min-height: 90upx;
		left: 0upx;
		bottom: 0upx;
		overflow: hidden;
	}
</style>
