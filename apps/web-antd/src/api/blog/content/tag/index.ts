import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogTagApi {
  /** 标签信息 */
  export interface Tag {
    id?: number;
    tagName: string;
  }
}

/** 查询标签分页 */
export function getTagPage(params: PageParam) {
  return requestClient.get<PageResult<BlogTagApi.Tag>>(
    '/blog/tag/page',
    { params },
  );
}

/** 获取标签 */
export function getTag(id: number) {
  return requestClient.get<BlogTagApi.Tag>(`/blog/tag/get?id=${id}`);
}

/** 创建标签 */
export function createTag(data: BlogTagApi.Tag) {
  return requestClient.post('/blog/tag/create', data);
}

/** 更新标签 */
export function updateTag(data: BlogTagApi.Tag) {
  return requestClient.put('/blog/tag/update', data);
}

/** 删除标签 */
export function deleteTag(id: number) {
  return requestClient.delete(`/blog/tag/delete?id=${id}`);
}
