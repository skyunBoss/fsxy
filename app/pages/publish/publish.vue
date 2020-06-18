<template>
	<view class="page" @touchstart="touchStart" @touchend="touchEnd">
		<form>
			<view class="uni-textarea">
				<textarea placeholder="这一刻的想法..." maxlength="50" v-model="content" />
			</view>
			<view class="uni-list list-pd">
				<view class="uni-list-cell cell-pd">
					<view class="uni-uploader">
						<view class="uni-uploader-body">
							<view class="uni-uploader__files">
								<block v-for="(image,index) in imageList" :key="index">
									<view class="uni-uploader__file" style="position: relative;">
										<image class="uni-uploader__img" mode="aspectFill" :src="image" :data-src="image"></image>
										<view class="close-view" @click="close(index)">×</view>
									</view>
								</block>
								<view class="uni-uploader__input-box" v-show="imageList.length < 1">
									<view class="uni-uploader__input" @tap="chooseImage"></view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view class="footer">
				<button type="default" class="feedback-submit" @click="publish">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { host } from '../../utils/request.js';
	import image from '../../utils/image.js';
	
	var sourceType = [
		['camera'],
		['album'],
		['camera', 'album']
	];
	
	var sizeType = [
		['compressed'],
		['original'],
		['compressed', 'original']
	];
	
	export default {
		data() {
			return {
				content:'',
				imageList: [],
				sourceTypeIndex: 2,
				sourceType: ['拍照', '相册', '拍照或相册'],
				sizeTypeIndex: 2,
				sizeType: ['压缩', '原图', '压缩或原图'],
				countIndex: 8,
				count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
				//侧滑返回start
				startX: 0, //点击屏幕起始位置
				movedX: 0, //横向移动的距离
				endX: 0, //接触屏幕后移开时的位置
				//end
			}
		},
		computed: mapState(['uuid', 'userId']),
		onUnload() {
			this.imageList = [];
			this.sourceTypeIndex = 2;
			this.sourceType = ['拍照', '相册', '拍照或相册'];
			this.sizeTypeIndex = 2;
			this.sizeType = ['压缩', '原图', '压缩或原图'];
			this.countIndex = 8;
		},
		methods: {
			publish() {
				if (!this.content) {
					uni.showToast({
						icon: 'none',
						title: '请输入内容'
					});
					return;
				}
				
				if (!this.imageList.length) {
					uni.showToast({
						icon: 'none',
						title: '请选择图片'
					});
					return;
				}
				
				uni.showLoading({
					title:'发布中',
				});
				
				uni.uploadFile({
					url: `${host}/comment`,
					filePath: this.imageList[0],
					name: 'file',
					header: {
						uuid: this.uuid
					},
					formData: {
						'user_id': this.userId,
						'content': this.content
					},
					success: (res) => {
						let pages = getCurrentPages();
						let beforePage = pages[pages.length - 2];
						
						uni.hideLoading();
						uni.showToast({
							icon: 'success',
							title: "发布成功"
						})
						uni.navigateBack({
							delta: 1,
							success: () => {
								beforePage.getList();
							}
						});
					},
					fail: () => {
						uni.hideLoading();
						uni.showToast({
							icon:'none',
							title:"发布失败,请检查网络"
						})
					}
				});
			},
			close(e) {
			    this.imageList.splice(e,1);
			},
			chooseImage() {
				uni.chooseImage({
					sourceType: sourceType[this.sourceTypeIndex],
					sizeType: sizeType[this.sizeTypeIndex],
					count: 1,
					success: res => {

						// #ifdef APP-PLUS
						//提交压缩,因为使用了H5+ Api,所以自定义压缩目前仅支持APP平台
						var compressd = cp_images=> {
							this.imageList = cp_images;//压缩后的图片路径
						};
						
						image.compress(res.tempFilePaths,compressd);
						// #endif
						
						// #ifndef APP-PLUS
						this.imageList = res.tempFilePaths;//非APP平台不支持自定义压缩,暂时没有处理,可通过uni-app上传组件的sizeType属性压缩
						// #endif
						
					}
				})
			},
			touchStart(e) {
				this.startX = e.mp.changedTouches[0].pageX;
			},
			touchEnd(e) {
				this.endX = e.mp.changedTouches[0].pageX;
				
				if (this.endX - this.startX > 200) {
					uni.navigateBack();
				}
			}
		}
	}
</script>

<style scoped>
	.footer {
		margin-top: 80upx;
	}
	
	.cell-pd {
		padding: 20upx 30upx;
	}

	.uni-textarea {
		width: auto;
		padding: 20upx 25upx;
		line-height: 1.6;
		height: 150upx;
	}
	
	.uni-list::before {
		height: 0;
	}
	
	.uni-list:after {
		height: 0;
	}
	
	.list-pd {
		margin-top: 0;
	}
	
	.close-view{
	    text-align: center;
		line-height:30upx;
		height: 35upx;
		width: 35upx;
		background: #ef5350;
		color: #FFFFFF;
		position: absolute;
		top: 1upx;
		right: 1upx;
		font-size: 35upx;
		border-radius: 8upx;
	}
	
	.page {
		width: 750upx;
		height: 100%;
	}
</style>