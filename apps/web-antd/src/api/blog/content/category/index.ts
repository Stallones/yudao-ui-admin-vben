import { requestClient } from '#/api/request';

export namespace BlogCategoryApi {
  /** 分类信息 */
  export interface Category {
    id?: number;
    categoryName: string;
  }
}

/** 获取分类 */
export function getCategory(id: number) {
  return requestClient.get<BlogCategoryApi.Category>(
    `/blog/category/get?id=${id}`,
  );
}

/** 创建分类 */
export function createCategory(data: BlogCategoryApi.Category) {
  return requestClient.post('/blog/category/create', data);
}

/** 更新分类 */
export function updateCategory(data: BlogCategoryApi.Category) {
  return requestClient.put('/blog/category/update', data);
}

/** 删除分类 */
export function deleteCategory(id: number) {
  return requestClient.delete(`/blog/category/delete?id=${id}`);
}

/** 获取分类列表 */
export function getCategoryList() {
  return requestClient.get<BlogCategoryApi.Category[]>('/blog/category/list');
}
