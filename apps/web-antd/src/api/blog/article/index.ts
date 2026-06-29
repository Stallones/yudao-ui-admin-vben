import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogArticleApi {
  /** 鏂囩珷淇℃伅 */
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

/** 鏌ヨ鏂囩珷鍒嗛〉 */
export function getArticlePage(params: PageParam) {
  return requestClient.get<PageResult<BlogArticleApi.Article>>(
    '/blog/article/page',
    { params },
  );
}

/** 鑾峰彇鏂囩珷璇︽儏 */
export function getArticle(id: number) {
  return requestClient.get<BlogArticleApi.Article>(
    `/blog/article/get?id=${id}`,
  );
}

/** 鏂板鏂囩珷 */
export function createArticle(data: BlogArticleApi.Article) {
  return requestClient.post('/blog/article/create', data);
}

/** 淇敼鏂囩珷 */
export function updateArticle(data: BlogArticleApi.Article) {
  return requestClient.put('/blog/article/update', data);
}

/** 鍒犻櫎鏂囩珷 */
export function deleteArticle(id: number) {
  return requestClient.delete(`/blog/article/delete?id=${id}`);
}

/** 鏇存柊鏂囩珷鐘舵€?*/
export function updateArticleStatus(id: number, status: number) {
  return requestClient.put(
    `/blog/article/update-status?id=${id}&status=${status}`,
  );
}
