<script lang="ts" setup>
import type { BlogUserApi } from '#/api/blog/user';

import { computed, ref } from 'vue';
import { useVbenForm } from '#/adapter/form';
import { useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';

import { createUser, getUser, updateUser } from '#/api/blog/user';
import { $t } from '#/locales';
import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<BlogUserApi.User>();

const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', ['博客用户'])
    : $t('ui.actionTitle.create', ['博客用户']),
);

const [Form, formApi] = useVbenForm({
  commonConfig: {
    componentProps: { class: 'w-full' },
    labelWidth: 80,
  },
  layout: 'horizontal',
  schema: useFormSchema(),
  showDefaultActions: false,
});

const [Modal, modalApi] = useVbenModal({
  async onConfirm() {
    const { valid } = await formApi.validate();
    if (!valid) return;
    modalApi.lock();
    const data = (await formApi.getValues()) as BlogUserApi.User;
    try {
      await (formData.value?.id ? updateUser(data) : createUser(data));
      await modalApi.close();
      emit('success');
      message.success($t('ui.actionMessage.operationSuccess'));
    } finally {
      modalApi.unlock();
    }
  },
  async onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      formData.value = undefined;
      return;
    }
    const data = modalApi.getData<BlogUserApi.User>();
    if (!data || !data.id) return;
    modalApi.lock();
    try {
      formData.value = await getUser(data.id);
      // 密码字段留空（更新时不修改）
      formData.value.password = undefined;
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal class="w-[600px]" :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
