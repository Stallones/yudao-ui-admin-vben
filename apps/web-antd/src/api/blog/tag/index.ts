import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogTagApi {
  /** 鏍囩淇℃伅 */
  export interface Tag {
    id?: number;
    tagName: string;
  }
}

/** 鏌ヨ鏍囩鍒嗛〉 */
export function getTagPage(params: PageParam) {
  return requestClient.get<PageResult<BlogTagApi.Tag>>(
    '/blog/tag/page',
    { params },
  );
}

/** 鑾峰彇鏍囩 */
export function getTag(id: number) {
  return requestClient.get<BlogTagApi.Tag>(`/blog/tag/get?id=${id}`);
}

/** 鍒涘缓鏍囩 */
export function createTag(data: BlogTagApi.Tag) {
  return requestClient.post('/blog/tag/create', data);
}

/** 鏇存柊鏍囩 */
export function updateTag(data: BlogTagApi.Tag) {
  return requestClient.put('/blog/tag/update', data);
}

/** 鍒犻櫎鏍囩 */
export function deleteTag(id: number) {
  return requestClient.delete(`/blog/tag/delete?id=${id}`);
}
