import type { RouteRecordRaw } from 'vue-router';

// 博客模块路由配置
// 注意：列表页（article/category/tag/...）由后端动态菜单 system_menu 注册，
// 本文件仅定义隐藏子页面（发布/编辑），通过 activePath 保持侧边栏高亮
const routes: RouteRecordRaw[] = [
  {
    path: '/blog',
    name: 'BlogCenter',
    meta: {
      title: '博客',
      icon: 'ep:notebook-2',
      hideInMenu: true,
      redirect: '/blog/article',
    },
    children: [
      {
        path: 'article/publish',
        name: 'BlogArticlePublish',
        component: () => import('#/views/blog/content/article/publish.vue'),
        meta: {
          title: '文章发布',
          activePath: '/blog/article',
        },
      },
      {
        path: String.raw`article/edit/:id(\d+)`,
        name: 'BlogArticleEdit',
        component: () => import('#/views/blog/content/article/publish.vue'),
        meta: {
          title: '文章编辑',
          activePath: '/blog/article',
        },
      },
    ],
  },
];

export default routes;
