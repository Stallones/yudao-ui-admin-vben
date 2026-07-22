<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BlogImageApi } from '#/api/blog/media/image';

import { Page, useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteImage,
  getImageList,
  updateImageSort,
} from '#/api/blog/media/image';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

/** 图片管理 */
defineOptions({ name: 'BlogImage' });

const [FormModal, formModalApi] = useVbenModal({
  connectedComponent: Form,
  destroyOnClose: true,
});

function handleRefresh() {
  gridApi.query();
}

function handleCreate() {
  formModalApi.setData(null).open();
}
function handleEdit(row: BlogImageApi.Image) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: BlogImageApi.Image) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
  });
  try {
    await deleteImage(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

async function handleSaveSort() {
  const rows = gridApi.grid.getData() as BlogImageApi.Image[];
  if (!rows.length) return;
  const payload = rows.map((item, index) => ({ ...item, sort: index + 1 }));
  const hideLoading = message.loading({ content: '保存排序中...', duration: 0 });
  try {
    await updateImageSort(payload);
    message.success($t('ui.actionMessage.operationSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: { schema: useGridFormSchema() },
  gridOptions: {
    columns: useGridColumns(),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async (_params, formValues) => {
          const list = await getImageList(formValues.type);
          return { list: list ?? [], total: (list ?? []).length };
        },
      },
    },
    rowConfig: { keyField: 'id', isHover: true },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<BlogImageApi.Image>,
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="图片列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['图片']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['blog:image:create'],
              onClick: handleCreate,
            },
            {
              label: '保存排序',
              type: 'primary',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:image:update'],
              onClick: handleSaveSort,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:image:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:image:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.id]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
