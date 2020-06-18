import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/examination/list",
    method: "get",
    params,
  });
}

export function doEdit(data) {
  return request({
    url: "/examination",
    method: "put",
    data,
  });
}
