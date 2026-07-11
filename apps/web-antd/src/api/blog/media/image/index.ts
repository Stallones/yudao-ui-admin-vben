import { requestClient } from '#/api/request';

export namespace BlogImageApi {
  /** 图片信息 */
  export interface Image {
    id?: number;
    type: number;
    coverId?: number;
    path: string;
    size?: number;
    extension?: string;
    sort?: number;
    createTime?: Date;
  }
}

/** 获取图片 */
export function getImage(id: number) {
  return requestClient.get<BlogImageApi.Image>(`/blog/image/get?id=${id}`);
}

/** 创建图片 */
export function createImage(data: BlogImageApi.Image) {
  return requestClient.post('/blog/image/create', data);
}

/** 更新图片 */
export function updateImage(data: BlogImageApi.Image) {
  return requestClient.put('/blog/image/update', data);
}

/** 删除图片 */
export function deleteImage(id: number) {
  return requestClient.delete(`/blog/image/delete?id=${id}`);
}

/** 批量更新图片排序 */
export function updateImageSort(data: BlogImageApi.Image[]) {
  return requestClient.put('/blog/image/update-sort', data);
}

/** 获取图片列表（按类型过滤） */
export function getImageList(type?: number) {
  return requestClient.get<BlogImageApi.Image[]>('/blog/image/list', {
    params: { type },
  });
}
