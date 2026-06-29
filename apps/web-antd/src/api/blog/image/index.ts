import { requestClient } from '#/api/request';

export namespace BlogImageApi {
  /** 鍥剧墖淇℃伅 */
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

/** 鑾峰彇鍥剧墖 */
export function getImage(id: number) {
  return requestClient.get<BlogImageApi.Image>(`/blog/image/get?id=${id}`);
}

/** 鍒涘缓鍥剧墖 */
export function createImage(data: BlogImageApi.Image) {
  return requestClient.post('/blog/image/create', data);
}

/** 鏇存柊鍥剧墖 */
export function updateImage(data: BlogImageApi.Image) {
  return requestClient.put('/blog/image/update', data);
}

/** 鍒犻櫎鍥剧墖 */
export function deleteImage(id: number) {
  return requestClient.delete(`/blog/image/delete?id=${id}`);
}

/** 鎵归噺鏇存柊鍥剧墖鎺掑簭 */
export function updateImageSort(data: BlogImageApi.Image[]) {
  return requestClient.put('/blog/image/update-sort', data);
}
