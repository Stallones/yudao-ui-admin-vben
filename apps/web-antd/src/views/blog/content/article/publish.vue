<script lang="ts" setup>
import type { BlogArticleApi } from '#/api/blog/content/article';
import type { BlogTagApi } from '#/api/blog/content/tag';
import type { BlogCategoryApi } from '#/api/blog/content/category';

import { onMounted, reactive, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';
import { Page } from '@vben/common-ui';

defineOptions({ name: 'BlogArticlePublish' });

import {
  createArticle,
  getArticle,
  updateArticle,
} from '#/api/blog/content/article';
import { getCategoryList } from '#/api/blog/content/category';
import { getTagPage } from '#/api/blog/content/tag';

const route = useRoute();
const router = useRouter();

const articleId = ref<number | null>(null);
const isEdit = ref(false);

const formData = reactive<BlogArticleApi.Article>({
  categoryId: 0,
  articleTitle: '',
  articleContent: '',
  articleType: 0,
  status: 1,
  tagIds: [],
});

const categoryOptions = ref<{ label: string; value: number }[]>([]);
const tagOptions = ref<{ label: string; value: number }[]>([]);
const statusOptions = getDictOptions(DICT_TYPE.BLOG_ARTICLE_STATUS, 'number');

async function loadOptions() {
  const [cats, tags] = await Promise.all([
    getCategoryList(),
    getTagPage({ pageNo: 1, pageSize: 100 }),
  ]);
  categoryOptions.value = (cats ?? []).map((c: BlogCategoryApi.Category) => ({
    label: c.categoryName,
    value: c.id!,
  }));
  tagOptions.value = (tags.list ?? []).map((t: BlogTagApi.Tag) => ({
    label: t.tagName,
    value: t.id!,
  }));
}

async function loadArticle(id: number) {
  const data = await getArticle(id);
  formData.id = data.id;
  formData.categoryId = data.categoryId;
  formData.articleTitle = data.articleTitle;
  formData.articleContent = data.articleContent ?? '';
  formData.articleType = data.articleType;
  formData.status = data.status;
  formData.tagIds = data.tagIds ?? [];
}

function validate(): boolean {
  if (!formData.articleTitle?.trim()) {
    message.warning('请输入文章标题');
    return false;
  }
  if (!formData.categoryId) {
    message.warning('请选择分类');
    return false;
  }
  return true;
}

async function handleSave() {
  if (!validate()) return;
  const hideLoading = message.loading({ content: '保存中...', duration: 0 });
  try {
    const payload = {
      id: formData.id,
      categoryId: formData.categoryId,
      articleTitle: formData.articleTitle,
      articleContent: formData.articleContent,
      articleType: formData.articleType ?? 0,
      status: formData.status,
      tagIds: formData.tagIds,
    } as BlogArticleApi.Article;
    if (isEdit.value && articleId.value) {
      await updateArticle(payload);
    } else {
      await createArticle(payload);
    }
    message.success('保存成功');
    router.push('/blog/article');
  } finally {
    hideLoading();
  }
}

function handleBack() {
  router.push('/blog/article');
}

onMounted(async () => {
  await loadOptions();
  const id = route.params.id;
  if (id && !Array.isArray(id)) {
    articleId.value = Number(id);
    isEdit.value = true;
    await loadArticle(articleId.value);
  }
});
</script>

<template>
  <Page auto-content-height>
    <div class="mb-4 flex items-center justify-between">
      <div class="text-lg font-bold">
        {{ isEdit ? '编辑文章' : '发布文章' }}
      </div>
      <div class="flex gap-2">
        <a-button @click="handleBack">返回</a-button>
        <a-button type="primary" @click="handleSave">保存</a-button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <a-form :label-col="{ span: 4 }" :wrapper-col="{ span: 18 }">
        <a-form-item label="标题" required>
          <a-input
            v-model:value="formData.articleTitle"
            placeholder="请输入文章标题"
          />
        </a-form-item>
        <a-form-item label="分类" required>
          <a-select
            v-model:value="formData.categoryId"
            :options="categoryOptions"
            placeholder="请选择分类"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="标签">
          <a-select
            v-model:value="formData.tagIds"
            :options="tagOptions"
            mode="multiple"
            placeholder="请选择标签"
            allow-clear
          />
        </a-form-item>
        <a-form-item label="状态">
          <a-select
            v-model:value="formData.status"
            :options="statusOptions"
            placeholder="请选择状态"
          />
        </a-form-item>
      </a-form>
    </div>

    <a-form-item label="内容" class="mt-4">
      <a-textarea
        v-model:value="formData.articleContent"
        :rows="14"
        placeholder="文章正文（Markdown 编辑器 md-editor-v3 暂未接入，后续引入）"
      />
    </a-form-item>
  </Page>
</template>
