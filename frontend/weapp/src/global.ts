import Taro from "@tarojs/taro";
import { getSystemEnv } from "./utils";

/** 系统环境 */
export let env = getSystemEnv();

const baseApi = {
  /** 开发版 */
  develop: "http://127.0.0.1:8081",

  /** 体验版 */
  trial: "https://zxiaosi.cn",

  /** 正式版 */
  release: "https://zxiaosi.cn",
};

/** 请求路径 */
export const baseUrl = baseApi[env] + (env == "develop" ? "/api" : "/wxapi");

/** 图片路径 */
export const imageUrl = baseApi[env] + "/images/";

/** 默认登录页 */
export const loginUrl = "/pages/home/index";

/** 本地缓存名字 */
export const tokenStorage = "userToken";
export const userInfoStorage = "userInfo";
export const locationStorage = "userLocation";

/** 全局事件 */
export const globalEvents = new Taro.Events();