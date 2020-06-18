import request from '../utils/request.js';

export async function getList(data) {
	return request({
		url: "/article/list",
		method: "get",
		data
	});
}

export async function getDetail(data) {
	return request({
		url: "/article/detail",
		method: "get",
		data
	});
}