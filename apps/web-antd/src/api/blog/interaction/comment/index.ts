import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogCommentApi {
  /** 评论信息 */
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

/** 查询评论分页 */
export function getCommentPage(params: PageParam) {
  return requestClient.get<PageResult<BlogCommentApi.Comment>>(
    '/blog/comment/page',
    { params },
  );
}

/** 获取评论 */
export function getComment(id: number) {
  return requestClient.get<BlogCommentApi.Comment>(
    `/blog/comment/get?id=${id}`,
  );
}

/** 更新评论审核状态 */
export function updateCommentCheck(id: number, isCheck: number) {
  return requestClient.put(
    `/blog/comment/update-check?id=${id}&isCheck=${isCheck}`,
  );
}

/** 删除评论 */
export function deleteComment(id: number) {
  return requestClient.delete(`/blog/comment/delete?id=${id}`);
}
