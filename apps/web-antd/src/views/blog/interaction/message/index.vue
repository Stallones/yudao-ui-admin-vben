<script lang="ts" setup>
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import type { BlogMessageApi } from '#/api/blog/interaction/message';

import { ref } from 'vue';
import { confirm, Page, useVbenDrawer } from '@vben/common-ui';
import { isEmpty } from '@vben/utils';
import { Descriptions, DescriptionsItem, message } from 'ant-design-vue';

import { ACTION_ICON, TableAction, useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  deleteMessage,
  getMessagePage,
  updateMessageCheck,
} from '#/api/blog/interaction/message';
import { $t } from '#/locales';

import { useGridColumns, useGridFormSchema } from './data';

/** 留言管理 */
defineOptions({ name: 'BlogMessage' });

async function handleAudit(row: BlogMessageApi.Message, isCheck: number) {
  const hideLoading = message.loading({ content: '处理中...', duration: 0 });
  try {
    await updateMessageCheck(row.id!, isCheck);
    message.success($t('ui.actionMessage.operationSuccess'));
    gridApi.query();
  } finally {
    hideLoading();
  }
}

async function handleDelete(row: BlogMessageApi.Message) {
  const hideLoading = message.loading({
    content: $t('ui.actionMessage.deleting', [row.id]),
    duration: 0,
  });
  try {
    await deleteMessage(row.id!);
    message.success($t('ui.actionMessage.deleteSuccess', [row.id]));
    gridApi.query();
  } finally {
    hideLoading();
  }
}

const checkedIds = ref<number[]>([]);
function handleRowCheckboxChange({ records }: { records: BlogMessageApi.Message[] }) {
  checkedIds.value = records.map((item) => item.id!);
}

async function handleBatchDelete() {
  if (isEmpty(checkedIds.value)) return;
  try {
    await confirm($t('ui.actionMessage.deleteConfirm', [`选中的 ${checkedIds.value.length} 条`]));
  } catch {
    return;
  }
  await Promise.all(checkedIds.value.map((id) => deleteMessage(id)));
  message.success($t('ui.actionMessage.deleteSuccess', ['批量数据']));
  gridApi.query();
}

const detail = ref<BlogMessageApi.Message | null>(null);
const [Drawer, drawerApi] = useVbenDrawer({
  onOpenChange(isOpen) {
    if (isOpen) {
      detail.value = drawerApi.getData<BlogMessageApi.Message>();
    }
  },
});

function handleDetail(row: BlogMessageApi.Message) {
  drawerApi.setData(row).open();
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
          return await getMessagePage({
            pageNo: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
      },
    },
    rowConfig: { keyField: 'id', isHover: true },
    toolbarConfig: { refresh: true, search: true },
  } as VxeTableGridOptions<BlogMessageApi.Message>,
  gridEvents: {
    checkboxAll: handleRowCheckboxChange,
    checkboxChange: handleRowCheckboxChange,
  },
});
</script>

<template>
  <Page auto-content-height>
    <Drawer title="留言详情">
      <Descriptions :column="1" bordered class="mt-2">
        <DescriptionsItem label="编号">{{ detail?.id }}</DescriptionsItem>
        <DescriptionsItem label="用户ID">{{ detail?.userId }}</DescriptionsItem>
        <DescriptionsItem label="回复用户ID">{{ detail?.replyUserId }}</DescriptionsItem>
        <DescriptionsItem label="审核状态">{{ detail?.isCheck === 1 ? '已通过' : '未通过' }}</DescriptionsItem>
        <DescriptionsItem label="内容">{{ detail?.content }}</DescriptionsItem>
        <DescriptionsItem label="创建时间">{{ detail?.createTime }}</DescriptionsItem>
      </Descriptions>
    </Drawer>
    <Grid table-title="留言列表">
      <template #toolbar-tools>
        <TableAction
          :actions="[
            {
              label: $t('ui.actionTitle.deleteBatch'),
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:message:delete'],
              onClick: handleBatchDelete,
            },
          ]"
        />
      </template>
      <template #actions="{ row }">
        <TableAction
          :actions="[
            {
              label: '详情',
              type: 'link',
              icon: ACTION_ICON.VIEW,
              onClick: handleDetail.bind(null, row),
            },
            {
              label: '通过',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:message:update'],
              onClick: handleAudit.bind(null, row, 1),
            },
            {
              label: '驳回',
              type: 'link',
              icon: ACTION_ICON.EDIT,
              auth: ['blog:message:update'],
              onClick: handleAudit.bind(null, row, 0),
            },
            {
              label: $t('common.delete'),
              type: 'link',
              danger: true,
              icon: ACTION_ICON.DELETE,
              auth: ['blog:message:delete'],
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
