import type { PageParam, PageResult } from '@vben/request';

import { requestClient } from '#/api/request';

export namespace BlogFavoriteApi {
  /** 鏀惰棌淇℃伅 */
  export interface Favorite {
    id?: number;
    type?: number;
    articleId?: number;
    isCheck?: number;
    createTime?: Date;
  }
}

/** 鏌ヨ鏀惰棌鍒嗛〉 */
export function getFavoritePage(params: PageParam) {
  return requestClient.get<PageResult<BlogFavoriteApi.Favorite>>(
    '/blog/favorite/page',
    { params },
  );
}

/** 鍒犻櫎鏀惰棌 */
export function deleteFavorite(id: number) {
  return requestClient.delete(`/blog/favorite/delete?id=${id}`);
}
