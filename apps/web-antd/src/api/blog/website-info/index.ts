import { requestClient } from '#/api/request';

export namespace BlogWebsiteInfoApi {
  /** 缃戠珯淇℃伅 */
  export interface WebsiteInfo {
    id?: number;
    webmasterAvatar?: string;
    webmasterName?: string;
    webmasterCopy?: string;
    webmasterProfileBackground?: string;
    giteeLink?: string;
    githubLink?: string;
    websiteName?: string;
    headerNotification?: string;
    sidebarAnnouncement?: string;
    recordInfo?: string;
    startTime?: Date;
    createTime?: Date;
    updateTime?: Date;
  }
}

/** 鏇存柊缃戠珯淇℃伅 */
export function updateWebsiteInfo(data: BlogWebsiteInfoApi.WebsiteInfo) {
  return requestClient.put('/blog/website-info/update', data);
}
