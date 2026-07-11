<script lang="ts" setup>
import type { BlogTagApi } from '#/api/blog/content/tag';

import { computed, ref } from 'vue';
import { useVbenForm } from '#/adapter/form';
import { useVbenModal } from '@vben/common-ui';
import { message } from 'ant-design-vue';

import { createTag, getTag, updateTag } from '#/api/blog/content/tag';
import { $t } from '#/locales';
import { useFormSchema } from '../data';

const emit = defineEmits(['success']);
const formData = ref<BlogTagApi.Tag>();

const getTitle = computed(() =>
  formData.value?.id
    ? $t('ui.actionTitle.edit', ['标签'])
    : $t('ui.actionTitle.create', ['标签']),
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
    const data = (await formApi.getValues()) as BlogTagApi.Tag;
    try {
      await (formData.value?.id ? updateTag(data) : createTag(data));
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
    const data = modalApi.getData<BlogTagApi.Tag>();
    if (!data || !data.id) return;
    modalApi.lock();
    try {
      formData.value = await getTag(data.id);
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
