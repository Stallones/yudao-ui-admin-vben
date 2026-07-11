<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BlogCategoryApi } from '#/api/blog/content/category';

import { ref } from 'vue';
import { confirm, Page, useVbenModal } from '@vben/common-ui';

defineOptions({ name: 'BlogCategory' });
import { isEmpty } from '@vben/utils';
import { message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  createCategory,
  deleteCategory,
  getCategoryList,
  updateCategory,
} from '#/api/blog/content/category';
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
function handleEdit(row: BlogCategoryApi.Category) {
  formModalApi.setData(row).open();
}

async function handleDelete(row: BlogCategoryApi.Category) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.categoryName]),
    duration: 0,
  });
  try {
    await deleteCategory(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.categoryName]));
    handleRefresh();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({ records }: { records: BlogCategoryApi.Category[] }) {
  checkedIds.value = records.map((item) => item.id!);
}

async function handleBatchDelete() {
  if (isEmpty(checkedIds.value)) return;
  confirm({
    content: $t('ui.actionMessage.deleteConfirm', [`选中的 ${checkedIds.value.length} 条`]),
    async onConfirm() {
      await Promise.all(checkedIds.value.map((id) => deleteCategory(id)));
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
          const list = await getCategoryList();
          return { list, total: list.length };
        },
      },
    },
    rowConfig: { keyField: 'id', isHover: true },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<BlogCategoryApi.Category>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <FormModal @success="handleRefresh" />
    <Grid table-title="分类列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.create', ['分类']),
              type: 'primary',
              icon: ACTION_ICON.ADD,
              auth: ['blog:category:create'],
              onClick: handleCreate,
            },
            {
              label: $t('ui.actionTitle.deleteBatch'),
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:category:delete'],
              onClick: handleBatchDelete,
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
              auth: ['blog:category:update'],
              onClick: handleEdit.bind(null, row),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:category:delete'],
              popConfirm: {
                title: $t('ui.actionMessage.deleteConfirm', [row.categoryName]),
                confirm: handleDelete.bind(null, row),
              },
            },
          ]"
        />
      </template>
    </Grid>
  </Page>
</template>
