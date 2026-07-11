<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BlogLinkApi } from '#/api/blog/site/link';

import { ref } from 'vue';
import { confirm, Page, useVbenModal } from '@vben/common-ui';

defineOptions({ name: 'BlogLink' });
import { isEmpty } from '@vben/utils';
import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createLink,
  deleteLink,
  getLink,
  getLinkPage,
  updateLink,
  updateLinkCheck,
} from '#/api/blog/site/link';
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
function handleEdit(row: BlogLinkApi.Link) {
  formModalApi.setData(row).open();
}

async function handleAudit(row: BlogLinkApi.Link, isCheck: number) {
  const hideLoading = message.loading({ content: '处理中...', duration: 0 });
  try {
    await updateLinkCheck(row.id!, isCheck);
    message.success($t('ui.actionMessage.operationSuccess'));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

async function handleDelete(row: BlogLinkApi.Link) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.name]),
    duration: 0,
  });
  try {
    await deleteLink(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.name]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({ records }: { records: BlogLinkApi.Link[] }) {
  checkedIds.value = records.map((item) => item.id!);
}

async function handleBatchDelete() {
  if (isEmpty(checkedIds.value)) return;
  confirm({
    content: $t('ui.actionMessage.deleteConfirm', [`选中的 ${checkedIds.value.length} 条`]),
    async onConfirm() {
      await Promise.all(checkedIds.value.map((id) => deleteLink(id)));
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
          return await getLinkPage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: { keyField: 'id', isHover: true },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<BlogLinkApi.Link>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="友链列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['友链']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['blog:link:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:link:delete'],
              onClick: handleBatchDelete,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '通过',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:link:update'],
              onClick: handleAudit.bind(null, row, 1),
            },
            {
              label: '驳回',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:link:update'],
              onClick: handleAudit.bind(null, row, 0),
            },
            {
              label: $t('common.edit'),
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:link:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:link:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.name]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
