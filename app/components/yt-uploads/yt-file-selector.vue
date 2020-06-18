<template>
	<view class="content">
		<view class="file-select-container" @click="_autoClose" v-if="isChoose === true">
			<view class="file-select-wrap" @click.stop>
				<view class="file-select-header" >
					<text>文件选择</text>
				</view>
				<scroll-view class="s-f-scroll-view" scroll-y>
					<block>
						<view @click.stop="backToPrevent" class="s-f-item" v-if="treeList.length > 1">
							<view class="s-f-item-path-name" >
								<image class="s-f-icon" :src="source.folder"></image>
								<view>上级目录</view>
							</view>
						</view>
						<view @click.stop="showDir(item.isDirectory, item.path)" class="s-f-item" v-for="(item,i) in flileList" :key="i">
							<view class="s-f-item-path-name">
								<image class="s-f-icon" :src="source.folder" v-if="item.isDirectory"></image>
								<image class="s-f-icon" :src="source.file" v-if="!item.isDirectory"></image>
								<view class="s-f-text"><text>{{item.pathName}}</text></view>
							</view>
							<image :src="source.checked" class="s-f-icon" v-if="checkList.indexOf(item.path.toString()) > -1"></image>
						</view>
					</block>
				</scroll-view>
				<view class="file-select-footer" >
					<view class="s-f-btn s-f-cancel" @click="closeHandle">取消</view>
					<view class="s-f-btn s-f-okey" @click="okeyHandle">确定</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import files from "./files.js"
	export default {
		props:{
			autoclose:{
				type:Boolean,
				default:true
			}
		},
		data() {
			return {
				title: 'Hello',
				flileList: [],
				treeList: ["root"],
				checkList: [], // 文件选择标记
				checkDataList: [], // 最终数据
				flag: 0,
				source: {
					file: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABDklEQVRYR+3XwQnCQBAF0D+oZy3BDrQDXW8eEtwS7MAOjBWIHdhBQAVvbuwgJViCnhVGIqggq8xggh4218zuPj4bMkP48UM/Ph8fAena9WvMLEXG8WAvrb3XeQFp6lpUhwPQVW3IWI5iM9as8QM2bkKMuXQjZj4RUfNWr0T4AatdRkQ9MQCwACcE6mgRZQEMLshR50yLKA1gI5MVd0eLKBVQxK9FlA7QIioB+BAMLGxkJq8XuzLAK4KZ9zYe9CsBSD7XAAgJhARCAiGBkEBIQJfA2iUETCW/WWkNAzMbmUTWD2xdG2fOH72+9JQ3dcXcgAZ17dAcRIBnN6OcjN5BL8itNUff6/8eTr9MXrT8CtDv/iF3ze/VAAAAAElFTkSuQmCC",
					folder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA30lEQVRYR+2XsQ3CMBBF/0F6MkKYgBXikoIQTwCMwAhskg1cpKDDGSEjZITQgw5FIkgRUmQLi6Q4d5a+v5+fXNiEiQdNvD8EYF4GjLHxIsKBgXzsbhCj3mfqHOL+DAyY8lYTaONUzCjyTJ2csiOhD4ApbUqA9SoMAPEbgBctAEbDwEVnquiX/hfgvStHWOutarrpNACA0jtVCYAYEANiQAyIATEwNGBsjCU3RLTyfWf45Jn5jiclWqt2ANBNzNUmeOAI5tSn1DlLVCFC0T9GvgCciwIG5/UvCHgw5yox8AJDX48hEgn/egAAAABJRU5ErkJggg==",
					checked: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABjElEQVRYR+3XwU3DMBQG4P+p5QwjlAnoBtS9IZRQb1A2KBNQJkBMQJkgokXihtMJyAiMUM4UfpSUlBLSYiuOKhC5JIdn+3tPtvIs2PIjW14fGwHRxHQaJG2RYdid2sbmcaWAKDJ70oQB0HaakBj1QnXqMqYccGcGQlzaTkTyWUR2s3hHRDlg/BCLyKE1ANAAhwI5cEX4AijMkaDJ2BXhDaADFad7xxXhFZCW3xXhHeCKqAVQhiBwpQM1KG7s2gBFBMmpDrudWgA2x/Uf8PcrQOJWBCfr9kOtFSBwowPVj8amL4LrMkRtgHzx/NhJA48QtIoILwAKzvDGXv6n/Lb4hh6iMoDAhQ7UMMt0YkbpOy37MvMfGpjKABAzNqD0sUpWy2vbPVUHLLqdGV+xr7Wa2WaeY/0AFrMlnEOlHy59o09AhvjIzLpp9Q2w+f98ifllgIkZCnDunOaGAavHeDWsvCG5Ny28MFn2+hUl6b0BO9LWR+rJqiH57GYcb0broHMk+dG1BlRM2nr41m/H78OTNzAWzjUaAAAAAElFTkSuQmCC"
				},
				isChoose: false
			}
		},
		onLoad() {
			
		},
		methods: {
			closeHandle() {
				this.treeList = ["root"]
				this.checkList = [] // 文件选择标记
				this.checkDataList = [] // 最终数据
				this.isChoose = false
			},
			_autoClose(){
				if(this.autoclose !== true) {
					return
				}
				this.checkList = [] // 文件选择标记
				this.checkDataList = [] // 最终数据
				this.isChoose = false
			},
			okeyHandle(){
				this.$emit("selected",this.checkDataList)
				this.closeHandle()
			},
			choose() {
				// #ifdef H5
					uni.showModal({
						title:"警告",
						content:"这个组件只能在安卓下使用",
						showCancel:false
					})
					return
				// #endif
				// #ifndef APP-PLUS
					if (uni.getSystemInfoSync().platform !== "android") {
						uni.showModal({
							title:"警告",
							content:"这个组件只能在安卓下使用",
							showCancel:false
						})
						return
					}
				// #endif
				this.isChoose = true
				this.flileList = files.getRootDir()
			},
			backToPrevent() {
				let r = this.flag - 1
				if (r === 0) {
					this.flileList = files.getRootDir()
					this.treeList = ["root"]
				} else {
					this.flileList = files.getSubDir(this.treeList[r])
				}
				this.flag = r
			},
			setOrDelSelectData(path, size) {
				let index = this.checkList.indexOf(path)
				if (index > -1) {
					this.$delete(this.checkList,index)
					this.$delete(this.checkDataList,index)
				} else {
					this.checkList.push(path)
					this.checkDataList.push({
						path: "file://" + path,
						size: size
					})
				}
			},
			showDir(isDir, path) {
				let _this = this
				if (isDir) {
					this.treeList.push(path)
					this.flileList = files.getSubDir(path)
					this.flag += 1
				} else {
					uni.getFileInfo({
						filePath: "file:///" + path.toString(),
						success(r) {
							_this.setOrDelSelectData(path.toString(), r.size)
						},
						fail(err) {
							console.log("err:", err);
						}
					})
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50upx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36upx;
		color: #8f8f94;
	}

	.file-select-container {
		width: 100%;
		height: 100%;

		display: flex;
		justify-content: center;
		align-items: center;
		background: rgba(0, 0, 0, 0.5);
		position: fixed;
		left: 0;
		top: 0;
		z-index: 999;
	}

	.file-select-wrap {
		width: 600upx;
		height: 800upx;
		overflow: hidden;
		background: #fff;
	}

	.file-select-header {
		width: 100%;
		height: 100upx;
		border-bottom: 2upx solid #eee;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding-left: 30upx;
	}

	.s-f-scroll-view {
		width: 600upx;
		height: 600upx;
		overflow: hidden;
		background: #fff;
	}

	.s-f-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 30upx 30upx;
		border-bottom: 1upx solid #eee;
		line-height: 1;
	}

	.s-f-icon {
		width: 45upx;
		height: 45upx;
		margin-right: 10upx;
		padding-left: 10upx;
	}

	.s-f-item-path-name {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
	.s-f-text{
		width: 400upx;
		white-space: pre-wrap;
		word-break: break-all;
		line-height: 1;
	}
	.file-select-footer {
		height: 100upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
	}
	.file-select-footer .s-f-btn {
		padding: 10upx 20upx;
		border: 2upx solid #eee;
		margin-right: 30upx;
		border-radius: 8upx;
	}
</style>
