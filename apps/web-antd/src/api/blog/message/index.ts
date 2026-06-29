import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogMessageApi {
  /** 鐣欒█淇℃伅 */
  export interface Message {
    id?: number;
    type?: string;
    parentId?: number;
    content?: string;
    userId?: number;
    replyUserId?: number;
    isCheck?: number;
    createTime?: Date;
  }
}

/** 鏌ヨ鐣欒█鍒嗛〉 */
export function getMessagePage(params: PageParam) {
  return requestClient.get<PageResult<BlogMessageApi.Message>>(
    '/blog/message/page',
    { params },
  );
}

/** 鑾峰彇鐣欒█ */
export function getMessage(id: number) {
  return requestClient.get<BlogMessageApi.Message>(
    `/blog/message/get?id=${id}`,
  );
}

/** 鏇存柊鐣欒█瀹℃牳鐘舵€?*/
export function updateMessageCheck(id: number, isCheck: number) {
  return requestClient.put(
    `/blog/message/update-check?id=${id}&isCheck=${isCheck}`,
  );
}

/** 鍒犻櫎鐣欒█ */
export function deleteMessage(id: number) {
  return requestClient.delete(`/blog/message/delete?id=${id}`);
}
