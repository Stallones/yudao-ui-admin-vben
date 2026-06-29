import { requestClient } from '#/api/request';

export namespace BlogCategoryApi {
  /** 鍒嗙被淇℃伅 */
  export interface Category {
    id?: number;
    categoryName: string;
  }
}

/** 鑾峰彇鍒嗙被 */
export function getCategory(id: number) {
  return requestClient.get<BlogCategoryApi.Category>(
    `/blog/category/get?id=${id}`,
  );
}

/** 鍒涘缓鍒嗙被 */
export function createCategory(data: BlogCategoryApi.Category) {
  return requestClient.post('/blog/category/create', data);
}

/** 鏇存柊鍒嗙被 */
export function updateCategory(data: BlogCategoryApi.Category) {
  return requestClient.put('/blog/category/update', data);
}

/** 鍒犻櫎鍒嗙被 */
export function deleteCategory(id: number) {
  return requestClient.delete(`/blog/category/delete?id=${id}`);
}
