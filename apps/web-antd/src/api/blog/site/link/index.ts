import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogLinkApi {
  /** 友链信息 */
  export interface Link {
    id?: number;
    name: string;
    url: string;
    description?: string;
    background?: string;
    email?: string;
    isCheck?: number;
    createTime?: Date;
  }
}

/** 查询友链分页 */
export function getLinkPage(params: PageParam) {
  return requestClient.get<PageResult<BlogLinkApi.Link>>(
    '/blog/link/page',
    { params },
  );
}

/** 获取友链 */
export function getLink(id: number) {
  return requestClient.get<BlogLinkApi.Link>(`/blog/link/get?id=${id}`);
}

/** 创建友链 */
export function createLink(data: BlogLinkApi.Link) {
  return requestClient.post('/blog/link/create', data);
}

/** 更新友链 */
export function updateLink(data: BlogLinkApi.Link) {
  return requestClient.put('/blog/link/update', data);
}

/** 删除友链 */
export function deleteLink(id: number) {
  return requestClient.delete(`/blog/link/delete?id=${id}`);
}

/** 更新友链审核状态 */
export function updateLinkCheck(id: number, isCheck: number) {
  return requestClient.put(
    `/blog/link/update-check?id=${id}&isCheck=${isCheck}`,
  );
}
