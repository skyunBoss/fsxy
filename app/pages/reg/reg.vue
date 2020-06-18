<template>
	<view class="content">
		<view class="input-group">
			<view class="input-row border">
				<text class="title">用户名：</text>
				<m-input type="text" focus clearable v-model="username" placeholder="请输入用户名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">姓　名：</text>
				<m-input type="text" focus clearable v-model="name" placeholder="请输入姓名"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">密　码：</text>
				<m-input type="password" displayable v-model="password" placeholder="请输入密码"></m-input>
			</view>
			<view class="input-row border">
				<text class="title" style="width: 220upx;">性　别：</text>
				<radio-group @change="radioChange">
					<label class="radio"><radio value="1" :checked="sex === '1'" color="#6155E7" style="transform: scale(0.8);" />男</label>
					<label class="radio"><radio value="2" :checked="sex === '2'" color="#6155E7" style="transform: scale(0.8); margin-left: 20upx;" />女</label>
				</radio-group>
			</view>
			<view class="input-row border">
				<text class="title">工　种：</text>
				<m-input type="text" clearable v-model="job" placeholder="请输入工种"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">工　龄：</text>
				<m-input type="text" clearable v-model="seniority" placeholder="请输入工龄"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">科　室：</text>
				<m-input type="text" clearable v-model="department" placeholder="请输入科室"></m-input>
			</view>
			<view class="input-row border">
				<text class="title">公　司：</text>
				<m-input type="text" clearable v-model="company" placeholder="请输入公司"></m-input>
			</view>
			<view class="input-row">
				<text class="title">生　日：</text>
				<picker mode="date" v-model="birthday" @change="bindDateChange">
					<view class="uni-input">{{birthday}}</view>
				</picker>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @tap="register">注册</button>
		</view>
	</view>
</template>

<script>
	import { register } from '../../api/user.js';
	import mInput from '../../components/m-input.vue';

	export default {
		components: {
			mInput
		},
		data() {
			return {
				username: '',
				name: '',
				password: '',
				sex: '1',
				job: '',
				seniority: '',
				department: '',
				company: '',
				birthday: this.getDate({
					format: true
				})
			}
		},
		methods: {
			register() {
				if (!this.username || !this.name || !this.password || !this.job || !this.seniority || !this.department || !this.company) {
					uni.showToast({
						icon: 'none',
						title: '请检查是否有漏填'
					});
					return;
				}
				
				register({
					username: this.username,
					name: this.name,
					password: this.password,
					sex: this.sex,
					job: this.job,
					seniority: this.seniority,
					department: this.department,
					company: this.company,
					birthday: this.birthday
				}).then(() => {
					uni.showToast({
						title: '注册成功'
					});
					uni.navigateBack({
						delta: 1
					});
				});
			},
			bindDateChange: function(e) {
				this.birthday = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
	
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>

<style>
	
</style>
