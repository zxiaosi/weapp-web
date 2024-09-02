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
export const getWordListApi = () => get("/word/list", {});

/** 添加单词 */
export const addWordApi = (word: WordApi) => post("/word/add", { ...word });

/** 更新单词 */
export const updateWordApi = (word: WordApi) =>
  post("/word/update", { ...word });

/** 收藏单词 */
export const favoriteWordApi = (id: number) => post("/word/favorites", { id });

/** 取消收藏单词 */
export const cancelFavoriteWordApi = (id: number) =>
  post("/word/cancelFavorites", { id });

/** 获取收藏列表 */
export const getFavoriteListApi = () => get("/word/favoritesList", {});
