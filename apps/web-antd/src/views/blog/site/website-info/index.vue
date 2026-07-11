<script lang="ts" setup>
import type { BlogWebsiteInfoApi } from '#/api/blog/site/website-info';

import { onMounted, ref } from 'vue';
import { Page } from '@vben/common-ui';

defineOptions({ name: 'BlogWebsiteInfo' });
import { message } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import { getWebsiteInfo, updateWebsiteInfo } from '#/api/blog/site/website-info';
import { $t } from '#/locales';

const formData = ref<BlogWebsiteInfoApi.WebsiteInfo>();

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: { class: 'w-full' },
    labelWidth: 120,
  },
  layout: 'vertical',
  schema: [
    {
      component: 'Input',
      fieldName: 'websiteName',
      label: '网站名称',
      componentProps: { placeholder: '请输入网站名称' },
    },
    {
      component: 'Input',
      fieldName: 'webmasterName',
      label: '站长名称',
      componentProps: { placeholder: '请输入站长名称' },
    },
    {
      component: 'Input',
      fieldName: 'webmasterAvatar',
      label: '站长头像',
      componentProps: { placeholder: '请输入头像URL' },
    },
    {
      component: 'Input',
      fieldName: 'webmasterCopy',
      label: '站长文案',
      componentProps: { placeholder: '请输入站长文案' },
    },
    {
      component: 'Input',
      fieldName: 'webmasterProfileBackground',
      label: '资料卡背景图',
      componentProps: { placeholder: '请输入背景图URL' },
    },
    {
      component: 'Input',
      fieldName: 'giteeLink',
      label: 'Gitee链接',
      componentProps: { placeholder: '请输入Gitee链接' },
    },
    {
      component: 'Input',
      fieldName: 'githubLink',
      label: 'GitHub链接',
      componentProps: { placeholder: '请输入GitHub链接' },
    },
    {
      component: 'Input',
      fieldName: 'headerNotification',
      label: '头部通知',
      componentProps: { placeholder: '请输入头部通知' },
    },
    {
      component: 'Input',
      fieldName: 'sidebarAnnouncement',
      label: '侧边公告',
      componentProps: { placeholder: '请输入侧边公告' },
    },
    {
      component: 'Input',
      fieldName: 'recordInfo',
      label: '备案信息',
      componentProps: { placeholder: '请输入备案信息' },
    },
  ],
  showDefaultActions: false,
});

async function loadData() {
  const data = await getWebsiteInfo();
  formData.value = data;
  await formApi.setValues(data);
}

async function handleSave() {
  const { valid } = await formApi.validate();
  if (!valid) return;
  const values = (await formApi.getValues()) as BlogWebsiteInfoApi.WebsiteInfo;
  const hideLoading = message.loading({ content: '保存中...', duration: 0 });
  try {
    await updateWebsiteInfo({ ...formData.value, ...values });
    message.success($t('ui.actionMessage.operationSuccess'));
    await loadData();
  } finally {
    hideLoading();
  }
}

onMounted(loadData);
</script>

<template>
  <Page auto-content-height>
    <div class="mb-4 flex items-center justify-between">
      <div class="text-lg font-bold">网站信息</div>
      <a-button
        type="primary"
        auth="blog:website-info:update"
        @click="handleSave"
      >
        保存
      </a-button>
    </div>
    <div class="mx-auto max-w-2xl">
      <Form />
    </div>
  </Page>
</template>
