/**
 * 加密的用户信息
 */
export interface GetUserInfoApi {
  code?: string;
  encryptedData?: string;
  iv?: string;
}

/**
 * 更新用户信息
 */
export interface UpdateUserApi {
  id: number;
  username: string;
  password?: string;
  avatar?: string;
}

/**
 * 单词
 */
export interface WordApi {
  id?: number;
  word?: string;
  translation1?: string;
  translation2?: string;
  favorites?: number;
}
