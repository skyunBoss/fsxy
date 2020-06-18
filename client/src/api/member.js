import request from "@/utils/request";

export function getList(params) {
  return request({
    url: "/member",
    method: "get",
    params,
  });
}
