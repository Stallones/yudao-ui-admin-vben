import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogUserApi {
  /** 博客用户 */
  export interface User {
    id?: number;
    email: string;
    password?: string;
    nickname: string;
    avatar?: string;
    /** 性别（0未知 1男 2女） */
    sex?: number;
    /** 状态（0启用/开启 1禁用/关闭）—— 使用 CommonStatusEnum，方向与博客审核状态相反 */
    status?: number;
    registerIp?: string;
    loginIp?: string;
    loginDate?: Date;
    createTime?: Date;
  }

  /** 用户分页查询参数 */
  export interface UserPageReqVO extends PageParam {
    email?: string;
    nickname?: string;
    status?: number;
  }
}

/** 获取用户分页 */
export function getUserPage(params: BlogUserApi.UserPageReqVO) {
  return requestClient.get<PageResult<BlogUserApi.User>>('/blog/user/page', {
    params,
  });
}

/** 获取用户详情 */
export function getUser(id: number) {
  return requestClient.get<BlogUserApi.User>(`/blog/user/get?id=${id}`);
}

/** 创建用户 */
export function createUser(data: BlogUserApi.User) {
  return requestClient.post('/blog/user/create', data);
}

/** 更新用户 */
export function updateUser(data: BlogUserApi.User) {
  return requestClient.put('/blog/user/update', data);
}

/** 删除用户 */
export function deleteUser(id: number) {
  return requestClient.delete(`/blog/user/delete?id=${id}`);
}

/** 更新用户状态（0启用 1禁用） */
export function updateUserStatus(id: number, status: number) {
  return requestClient.put(`/blog/user/update-status?id=${id}&status=${status}`);
}
