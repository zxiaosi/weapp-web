import { get, post } from "@/request";
import { GetUserInfoApi, UpdateUserApi, WordApi } from "./model";

/** 获取用户信息 */
export const getUserInfoApi = () => get("/userInfo", {});

/** 更新用户手机号 */
export const updatePhoneApi = (data: GetUserInfoApi) =>
  post("/phone", { ...data });

/** 更新用户信息 */
export const updateUserApi = (data: UpdateUserApi) =>
  post("/updateUser", { ...data });

/** 服务通知 */
export const sendBizApi = (issue: string) =>
  post(`/sendBiz?issue=${encodeURIComponent(issue)}`);

/** 获取单词列表 */
export const getWordListApi = (type: number) =>
  get(`/word/list?type=${type}`, {});

/** 更新单词 */
export const updateWordApi = (word: WordApi) =>
  post("/word/update", { ...word });

/** 获取题库详情 */
export const getWordDetailApi = (id: number, type: number) =>
  get(`/word/detail?id=${id}&type=${type}`);

/** 获取收藏列表 */
export const getFavoriteListApi = (type: number) =>
  get(`/word/favoritesList?type=${type}`, {});
