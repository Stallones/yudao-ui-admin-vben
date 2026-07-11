import { requestClient } from '#/api/request';

export namespace BlogWebsiteInfoApi {
  /** 网站信息 */
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

/** 获取网站信息 */
export function getWebsiteInfo() {
  return requestClient.get<BlogWebsiteInfoApi.WebsiteInfo>(
    '/blog/website-info/get',
  );
}

/** 更新网站信息 */
export function updateWebsiteInfo(data: BlogWebsiteInfoApi.WebsiteInfo) {
  return requestClient.put('/blog/website-info/update', data);
}
