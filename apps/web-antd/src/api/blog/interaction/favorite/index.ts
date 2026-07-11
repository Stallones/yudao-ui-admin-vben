import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogFavoriteApi {
  /** 收藏信息 */
  export interface Favorite {
    id?: number;
    type?: number;
    articleId?: number;
    isCheck?: number;
    createTime?: Date;
  }
}

/** 查询收藏分页 */
export function getFavoritePage(params: PageParam) {
  return requestClient.get<PageResult<BlogFavoriteApi.Favorite>>(
    '/blog/favorite/page',
    { params },
  );
}

/** 删除收藏 */
export function deleteFavorite(id: number) {
  return requestClient.delete(`/blog/favorite/delete?id=${id}`);
}
