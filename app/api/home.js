import request from '../utils/request.js';

export async function getList(data) {
	return request({
		url: "/category/list",
		method: "get",
		data
	});
}