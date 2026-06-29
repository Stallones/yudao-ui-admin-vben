import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogCommentApi {
  /** 璇勮淇℃伅 */
  export interface Comment {
    id?: number;
    type?: string;
    articleId?: number;
    parentId?: number;
    content?: string;
    userId?: number;
    replyUserId?: number;
    isCheck?: number;
    createTime?: Date;
  }
}

/** 鏌ヨ璇勮鍒嗛〉 */
export function getCommentPage(params: PageParam) {
  return requestClient.get<PageResult<BlogCommentApi.Comment>>(
    '/blog/comment/page',
    { params },
  );
}

/** 鑾峰彇璇勮 */
export function getComment(id: number) {
  return requestClient.get<BlogCommentApi.Comment>(
    `/blog/comment/get?id=${id}`,
  );
}

/** 鏇存柊璇勮瀹℃牳鐘舵€?*/
export function updateCommentCheck(id: number, isCheck: number) {
  return requestClient.put(
    `/blog/comment/update-check?id=${id}&isCheck=${isCheck}`,
  );
}

/** 鍒犻櫎璇勮 */
export function deleteComment(id: number) {
  return requestClient.delete(`/blog/comment/delete?id=${id}`);
}
