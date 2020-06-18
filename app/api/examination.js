import request from '../utils/request.js';

export async function getDetail(data) {
	return request({
		url: "/examination/detail",
		method: "get",
		data
	});
}