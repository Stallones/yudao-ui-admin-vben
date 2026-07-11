import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogArticleApi {
  /** 文章信息 */
  export interface Article {
    id?: number;
    categoryId: number;
    categoryName?: string;
    articleCover?: string;
    articleTitle: string;
    articleContent?: string;
    articleType: number;
    isTop?: number;
    status: number;
    visitCount?: number;
    tagIds?: number[];
    tagNames?: string[];
    createTime?: Date;
  }
}

/** 查询文章分页 */
export function getArticlePage(params: PageParam) {
  return requestClient.get<PageResult<BlogArticleApi.Article>>(
    '/blog/article/page',
    { params },
  );
}

/** 获取文章详情 */
export function getArticle(id: number) {
  return requestClient.get<BlogArticleApi.Article>(
    `/blog/article/get?id=${id}`,
  );
}

/** 新增文章 */
export function createArticle(data: BlogArticleApi.Article) {
  return requestClient.post('/blog/article/create', data);
}

/** 修改文章 */
export function updateArticle(data: BlogArticleApi.Article) {
  return requestClient.put('/blog/article/update', data);
}

/** 删除文章 */
export function deleteArticle(id: number) {
  return requestClient.delete(`/blog/article/delete?id=${id}`);
}

/** 更新文章状态 */
export function updateArticleStatus(id: number, status: number) {
  return requestClient.put(
    `/blog/article/update-status?id=${id}&status=${status}`,
  );
}
