<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">用户名：</text>
				<m-input class="m-input" type="text" clearable focus v-model="username" placeholder="请输入用户名"></m-input>
			</view>
			<view class="input-row">
				<text class="title">密　码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="bindLogin">登录</button>
		</view>
		<view class="action-row">
			<navigator url="../reg/reg">注册账号</navigator>
			<!-- <text>|</text> -->
			<!-- <navigator url="../pwd/pwd">忘记密码</navigator> -->
		</view>
	</view>
</template>

<script>
	import { login } from '../../api/user.js';
	import { mapState, mapMutations } from 'vuex';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				providerList: [],
				hasProvider: false,
				username: '',
				password: '',
				positionTop: 0,
			}
		},
		methods: {
			...mapMutations(['login']),
			initPosition() {
				/**
				 * 使用 absolute 定位，并且设置 bottom 值进行定位。软键盘弹出时，底部会因为窗口变化而被顶上来。
				 * 反向使用 top 进行定位，可以避免此问题。
				 */
				this.positionTop = uni.getSystemInfoSync().windowHeight - 100;
			},
			bindLogin() {
				if (!this.username || !this.password) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名或密码'
					});
					return;
				}
				
				login({
					username: this.username,
					password: this.password
				}).then(({ id, uuid }) => {
					this.toMain(id, uuid);
				});
			},
			toMain(id, uuid) {
				this.login(id, uuid);
				
				uni.showToast({
					title: '登录成功'
				});
				uni.reLaunch({
					url: '../home/home',
				});
			}
		},
		onReady() {
			this.initPosition();
		}
	}
</script>

<style>
	.action-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
	}

	.action-row navigator {
		color: #007aff;
		padding: 0 10px;
	}

	.oauth-row {
		display: flex;
		flex-direction: row;
		justify-content: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
	}

	.oauth-image {
		position: relative;
		width: 50px;
		height: 50px;
		border: 1px solid #dddddd;
		border-radius: 50px;
		margin: 0 20px;
		background-color: #ffffff;
	}

	.oauth-image image {
		width: 30px;
		height: 30px;
		margin: 10px;
	}

	.oauth-image button {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}
</style>
