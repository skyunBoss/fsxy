import request from "@/utils/request";
import { encryptedData } from "@/utils/encrypt";
import { loginRSA } from "@/config/settings";

export async function login(data) {
  if (loginRSA) {
    data = await encryptedData(data);
  }
  return request({
    url: "/admin/login",
    method: "post",
    data,
  });
}

export function getInfo(accessToken) {
  return request({
    url: "/admin/user/info",
    method: "post",
    data: {
      accessToken,
    },
  });
}