<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BlogUserApi } from '#/api/blog/user';

import { ref } from 'vue';
import { confirm, Page, useVbenModal } from '@vben/common-ui';

defineOptions({ name: 'BlogUser' });
import { isEmpty } from '@vben/utils';
import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteUser,
  getUserPage,
  updateUserStatus,
} from '#/api/blog/user';
import { $t } from '#/locales';
import { useFormSchema, useGridColumns, useGridFormSchema } from './data';
import Form from './modules/form.vue';

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
function handleEdit(row: BlogUserApi.User) {
  formModalApi.setData(row).open();
}

async function handleToggleStatus(row: BlogUserApi.User) {
  const nextStatus = row.status === 0 ? 1 : 0;
  const hideLoading = message.loading({ content: '处理中...', duration: 0 });
  try {
    await updateUserStatus(row.id!, nextStatus);
    message.success($t('ui.actionMessage.operationSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

async function handleDelete(row: BlogUserApi.User) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.nickname]),
    duration: 0,
  });
  try {
    await deleteUser(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.nickname]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({ records }: { records: BlogUserApi.User[] }) {
  checkedIds.value = records.map((item) => item.id!);
}

async function handleBatchDelete() {
  if (isEmpty(checkedIds.value)) return;
  confirm({
    content: $t('ui.actionMessage.deleteConfirm', [`选中的 ${checkedIds.value.length} 条`]),
    async onConfirm() {
      await Promise.all(checkedIds.value.map((id) => deleteUser(id)));
      message.success($t('ui.actionMessage.deleteSuccess', ['批量数据']));
      handleRefresh();
    },
  });
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
          return await getUserPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: { keyField: 'id', isHover: true },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<BlogUserApi.User>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="博客用户列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['博客用户']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['blog:user:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:user:delete'],
              onClick: handleBatchDelete,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: row.status === 0 ? '禁用' : '启用',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:user:update'],
              onClick: handleToggleStatus.bind(null, row),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:user:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:user:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.nickname]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
