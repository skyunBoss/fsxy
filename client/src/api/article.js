import request from "@/utils/request";

export function getCategoryList(params) {
  return request({
    url: "/category/list",
    method: "get",
    params,
  });
}

export function getArticleList(params) {
  return request({
    url: "/article/list",
    method: "get",
    params,
  });
}

export function getCategoryDetail(params) {
  return request({
    url: "/category/detail",
    method: "get",
    params,
  });
}

export function getArticleDetail(params) {
  return request({
    url: "/article/detail",
    method: "get",
    params,
  });
}

export function doCategoryAdd(data) {
  return request({
    url: "/category",
    method: "post",
    data,
  });
}

export function doArticleAdd(data) {
  return request({
    url: "/article",
    method: "post",
    data,
  });
}

export function doCategoryEdit(data) {
  return request({
    url: "/categroy",
    method: "put",
    data,
  });
}

export function doArticleEdit(data) {
  return request({
    url: "/article",
    method: "put",
    data,
  });
}

export function doCategroyDelete(data) {
  return request({
    url: "/category",
    method: "delete",
    data,
  });
}

export function doArticleDelete(data) {
  return request({
    url: "/article",
    method: "delete",
    data,
  });
}
