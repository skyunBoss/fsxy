import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/contact",
    method: "get",
    params,
  });
}

export function doAdd(data) {
  return request({
    url: "/contact",
    method: "post",
    data,
  });
}

export function doEdit(data) {
  return request({
    url: "/contact",
    method: "put",
    data,
  });
}

export function doDelete(data) {
  return request({
    url: "/contact",
    method: "delete",
    data,
  });
}
