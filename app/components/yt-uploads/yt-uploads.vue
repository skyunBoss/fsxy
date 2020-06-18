<template>
	<view class="yt-uploads">
		<yt-file-selector ref="fileSelector" :autoclose="false" @selected="_selectedHandler"></yt-file-selector>
	</view>
</template>

<script>
	let options = {
		// 选则图片或者视频 图片:0 视频:1
		type: 0,
		// 上传文件的key 后台根据这个key取得文件
		name:'file',
		// header请求头
		headers: {},
		// 额外的传输数据
		data: {},
		// 上传的地址
		host: "",
		// 选择数量
		count: 5,
		// 在上传之前调用
		beforeUpload:()=>{return true},
		// 创建成功钩子
		created: ()=>{},
		// 是否自动上传
		autoUpload: true,
	}
	import ytFileSelector from "./yt-file-selector.vue"
	
	export default {
		components:{
			ytFileSelector
		},
		props: {
			options:{
				type:Object,
				default:() =>{
					return null
				}
			},
		},
		created() {
			this._uploadsinit()
		},
		data() {
			return {
				loadingStaus: false,
				chooseList: [],
				uploadList: [],
			};
		},
		computed:{
			opts(){
				// 组合options
				if (this._type(this.options) === "object") {
					options = Object.assign(options,this.options)
				}
				return options
			}
		},
		methods: {
			_selectedHandler(r){
				this._success({
					"errMsg": "chooseImage:ok",
					"tempFiles": r
				})
			},
			// 初始化
			_uploadsinit() {
				// 判断上传路径是否存在
				if (this.opts.host === "") {
					throw new Error('props options[host] is not exist at uploads plugs')
				}
				// 调用生命周期函数
				this.opts.created(this)
			},
			_type(val) {
				// 判断参数类型
				return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase()
			},
			upload() { // 上传方法
				// 调用生命周期
				let before = this.opts.beforeUpload(this)
				if (!before) {
					return
				} 
				this._sendData()
			},
			select(){
				this._choose()
			},
			// 选择文件方法
			_choose() {
				switch (this.opts.type) {
					case 0:
						this._chooseImages()
						break
					case 1:
						this._chooseVideos()
						break
					default:
						this._chooseFiles()
						// this._chooseFiles()
				}
			},
			_chooseFiles(){
				// #ifdef APP-PLUS
					// 待实现
					this.$refs.fileSelector.choose()
				// #endif
			},
			// 选择图片
			_chooseImages() {
				let _this = this
				uni.chooseImage({
					count: this.opts.count - 0,
					success(ret) {
						_this._success(ret)
					},
					fail(ret) {
						this.$emit("fail",{type:0,data:ret.errMsg})
					}
				})
			},
			// 选择视频
			_chooseVideos() {
				let _this = this
				uni.chooseVideo({
					count: this.count - this.chooseList.length,
					success(ret) {
						_this._success(ret)
					},
					fail(ret) {
						this.$emit("fail",{type:0,data:ret.errMsg})
					}
				})
			},
			// 成功的方法
			_success(ret){
				let _this = this
				if (ret.errMsg === "chooseImage:ok") { // 文件选择成功
					let tmp = [] // 初始化选择数据
					ret.tempFiles.forEach((o) => {
						tmp.push({
							state: 0,
							path: o.path,
							size: o.size
						})
					})
					_this.chooseList = tmp
					if (_this.opts.autoUpload) {
						_this.upload()
						_this.$set(_this,'loadingStaus', true)
					}
					this.$emit("selected",_this.chooseList)
				} else {
					this.$emit("fail",{type:0,data:ret.errMsg})
				}
			},
			_sendData() {
				let _this = this
				_this.uploadList = []
				// 上传数据的方法
				if (_this.chooseList.length < 1) {
					this.$emit("fail",{type:0,data:"还没有选择附件"})
					return
				}
				
				let flag = 0 //加个锁判断是否传完
				// 由于考虑兼容性，此处用循环上传的方法
				_this.chooseList.forEach((o, i) => {
					if (o.state === 0) { // 这里只对没有提交的数据进行提交
						uni.uploadFile({
							url: this.opts.host,
							filePath: o.path,
							name: this.opts.name,
							header: this.opts.headers === null ? {} : this.opts.headers,
							formData: this.opts.data === null ? {} : this.opts.data,
							success(ret) { // 上传成功回调
								if (_this._type(ret.data) === 'string') { // 判断数据类型
									_this.uploadList.push(JSON.parse(ret.data))
								} else {
									_this.uploadList.push(ret.data)
								}
								
								_this.$emit("process",{index:flag,state:1})
								flag += 1
								if (flag >= _this.chooseList.length) {
									_this.$emit("success", _this.uploadList)
									// 初始化数据
									_this.chooseList = []
									_this.uploadList = []
									_this.$set(_this,'loadingStaus', false)
								}
							},
							fail(ret) { // 上传失败回调
								_this.$emit("process",{index:flag,state:2})
								if (_this._type(ret.data) === 'string') { // 判断数据类型
									_this.uploadList.push(JSON.parse(ret.data))
								} else {
									_this.uploadList.push(ret.data)
								}
								flag += 1
								if (flag >= _this.chooseList.length) {
									_this.$emit("success", _this.uploadList)
									// 初始化数据
									_this.chooseList = []
									_this.uploadList = []
									_this.$set(_this,'loadingStaus', false)
								}
							}
						})
					} else {
						flag += 1
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.list {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		flex-direction: column;
		padding: 10upx 30upx;

		.item {
			width: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10upx 0;
			border-bottom: 2upx dashed #eee;
			font-size: 28upx;

			.loading {
				margin-right: 0;
			}

			.info {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.filename {
					max-width: 500upx;
					word-break: break-all;
					line-height: 1.2;
				}
			}

			.action {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-shrink: 0;
				margin-left: 20upx;

				.del {
					color: red;
					font-size: 28upx;
					display: flex;
					justify-content: center;
					align-items: center;
					.a-icon{
						width: 32upx;
						height: 32upx;
						margin-right: 4upx;
					}
				}
			}
		}
		
		.icon {
			width: 32upx;
			height: 32upx;
			flex-shrink: 0;
			margin-right: 10upx;
		}
		
		.btn{
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			padding: 20upx 0;
		}
	}
</style>
