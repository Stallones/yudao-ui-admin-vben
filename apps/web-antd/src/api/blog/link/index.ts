import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogLinkApi {
  /** 鍙嬮摼淇℃伅 */
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

/** 鏌ヨ鍙嬮摼鍒嗛〉 */
export function getLinkPage(params: PageParam) {
  return requestClient.get<PageResult<BlogLinkApi.Link>>(
    '/blog/link/page',
    { params },
  );
}

/** 鑾峰彇鍙嬮摼 */
export function getLink(id: number) {
  return requestClient.get<BlogLinkApi.Link>(`/blog/link/get?id=${id}`);
}

/** 鍒涘缓鍙嬮摼 */
export function createLink(data: BlogLinkApi.Link) {
  return requestClient.post('/blog/link/create', data);
}

/** 鏇存柊鍙嬮摼 */
export function updateLink(data: BlogLinkApi.Link) {
  return requestClient.put('/blog/link/update', data);
}

/** 鍒犻櫎鍙嬮摼 */
export function deleteLink(id: number) {
  return requestClient.delete(`/blog/link/delete?id=${id}`);
}

/** 鏇存柊鍙嬮摼瀹℃牳鐘舵€?*/
export function updateLinkCheck(id: number, isCheck: number) {
  return requestClient.put(
    `/blog/link/update-check?id=${id}&isCheck=${isCheck}`,
  );
}
