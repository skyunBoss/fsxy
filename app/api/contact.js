import request from '../utils/request.js';

export async function getList(data) {
	return request({
		url: "/contact",
		method: "get",
		data
	});
}