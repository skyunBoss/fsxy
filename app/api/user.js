import request from '../utils/request.js';

export async function login(data) {
	return request({
		url: "/app/login",
		method: "post",
		data
	});
}

export async function register(data) {
	return request({
		url: "/app/register",
		method: "post",
		data
	});
}