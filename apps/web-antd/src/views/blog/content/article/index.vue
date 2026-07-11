<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BlogArticleApi } from '#/api/blog/content/article';

import { useRouter } from 'vue-router';
import { confirm, Page, useVbenDrawer } from '@vben/common-ui';

defineOptions({ name: 'BlogArticle' });
import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteArticle,
  getArticlePage,
  updateArticleStatus,
} from '#/api/blog/content/article';
import { $t } from '#/locales';
import { useGridColumns, useGridFormSchema } from './data';

const router = useRouter();

const [Drawer, drawerApi] = useVbenDrawer({});

function handleCreate() {
  router.push('/blog/article/publish');
}

function handleEdit(row: BlogArticleApi.Article) {
  router.push(`/blog/article/edit/${row.id}`);
}

async function handleDelete(row: BlogArticleApi.Article) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.title]),
    duration: 0,
  });
  try {
    await deleteArticle(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.title]));
    gridApi.query();
  } finally {
    hideLoading();
  }
}

async function handleToggleStatus(row: BlogArticleApi.Article) {
  const nextStatus = row.status === 1 ? 0 : 1;
  await updateArticleStatus(row.id!, nextStatus);
  message.success($t('ui.actionMessage.operationSuccess'));
  gridApi.query();
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: useGridFormSchema() },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await getArticlePage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: { keyField: 'id', isHover: true },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<BlogArticleApi.Article>,
});
</script>

<template>
  <Page auto-content-height>
    <Drawer />
    <Grid table-title="文章列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['文章']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['blog:article:create'],
              onClick: handleCreate,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:article:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: row.status === 1 ? '置为不通过' : '置为通过',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:article:update'],
              onClick: handleToggleStatus.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:article:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.title]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
