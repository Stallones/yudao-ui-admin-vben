<script lang="ts" setup>
import type { BlogCategoryApi } from '#/api/blog/content/category';

import { computed, ref } from 'vue';
import { useVbenForm } from '#/adapter/form';
import { useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';

import { createCategory, getCategory, updateCategory } from '#/api/blog/content/category';
import { $t } from '#/locales';
import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<BlogCategoryApi.Category>();

const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', ['分类'])
    : $t('ui.actionTitle.create', ['分类']),
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
    const data = (await formApi.getValues()) as BlogCategoryApi.Category;
    try {
      await (formData.value?.id ? updateCategory(data) : createCategory(data));
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
    const data = modalApi.getData<BlogCategoryApi.Category>();
    if (!data || !data.id) return;
    modalApi.lock();
    try {
      formData.value = await getCategory(data.id);
      await formApi.setValues(formData.value);
    } finally {
      modalApi.unlock();
    }
  },
});
</script>

<template>
  <Modal class="w-[500px]" :title="getTitle">
    <Form class="mx-4" />
  </Modal>
</template>
