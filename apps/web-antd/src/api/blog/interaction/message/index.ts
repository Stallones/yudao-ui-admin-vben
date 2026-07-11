import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogMessageApi {
  /** 留言信息 */
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

/** 查询留言分页 */
export function getMessagePage(params: PageParam) {
  return requestClient.get<PageResult<BlogMessageApi.Message>>(
    '/blog/message/page',
    { params },
  );
}

/** 获取留言 */
export function getMessage(id: number) {
  return requestClient.get<BlogMessageApi.Message>(
    `/blog/message/get?id=${id}`,
  );
}

/** 更新留言审核状态 */
export function updateMessageCheck(id: number, isCheck: number) {
  return requestClient.put(
    `/blog/message/update-check?id=${id}&isCheck=${isCheck}`,
  );
}

/** 删除留言 */
export function deleteMessage(id: number) {
  return requestClient.delete(`/blog/message/delete?id=${id}`);
}
