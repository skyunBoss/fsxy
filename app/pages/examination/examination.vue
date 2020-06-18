<template>
	<view class="content">
		<navigator url="/pages/precautions/precautions">
			<button type="primary" class="primary">注意事项</button>
		</navigator>
		<navigator url="/pages/process/process">
			<button type="primary" class="primary">体检流程图</button>
		</navigator>
		<navigator url="/pages/notice/notice">
			<button type="primary" class="primary">体检须知</button>
		</navigator>
		<picker @change="downloadFile" :range="range">
			<button type="primary" class="primary">下载模板</button>
		</picker>
		<button type="primary" class="primary" @click="$refs.uploads.select()">上传</button>
		<navigator url="/pages/result/result">
			<button type="primary" class="primary">查看预约结果</button>
		</navigator>
		<yt-uploads ref="uploads" :options="options"></yt-uploads>
	</view>
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import { host } from '../../utils/request.js';
	
	export default {
		data() {
			return {
				range: ['单位介绍信模板', '放射体检标准模板', '职业健康检查委托协议书'],
				options: {
					type: 2,
					name: 'file',
					headers: {
						uuid: this.uuid
					},
					data: {
						user_id: this.userId
					},
					count: 1,
					host: `${host}/examination`,
					beforeUpload: () => {
						return true;
					},
					success: () => {
						uni.showToast({
							title: '上传成功'
						});
					}
				}
			}
		},
		computed: mapState(['uuid', 'userId']),
		methods: {
			downloadFile(e) {
				uni.downloadFile({
				    url: `http://upload.51des.com/tpl${e.target.value + 1}.doc`,
				    success: res => {
				        if (res.statusCode === 200) {
							uni.saveFile({
								tempFilePath: res.tempFilePath,
								success: ({ savedFilePath }) => {
									uni.showModal({
										title: '下载成功',
										content: `文件存储地址：${savedFilePath}`,
										showCancel: false,
									});
								}
							});
				        }
				    }
				});
			},
			// uploadFile() {
			// 	uni.chooseImage({
			// 	    success: chooseImageRes => {
			// 	        const tempFilePaths = chooseImageRes.tempFilePaths;
						
			// 	        uni.uploadFile({
			// 	            url: `${host}/examination`,
			// 	            filePath: tempFilePaths[0],
			// 	            name: 'file',
			// 				header: {
			// 					uuid: this.uuid
			// 				},
			// 				formData: {
			// 					user_id: this.userId
			// 				},
			// 	            success: res => {
			// 					uni.showToast({
			// 						title: '上传成功'
			// 					});
			// 	            }
			// 	        });
			// 	    }
			// 	});
			// }
		}
	}
</script>

<style>
	button {
		width: 100%;
		margin-top: 40upx;
	}
</style>
