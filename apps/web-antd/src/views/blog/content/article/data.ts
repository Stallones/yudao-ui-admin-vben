import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

import { getCategoryList } from '#/api/blog/content/category';

/** 搜索表单 Schema */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'title',
      label: '标题',
      component: 'Input',
      componentProps: { placeholder: '请输入标题', allowClear: true },
    },
    {
      fieldName: 'status',
      label: '状态',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.BLOG_ARTICLE_STATUS, 'number'),
        placeholder: '请选择状态',
        allowClear: true,
      },
    },
    {
      fieldName: 'categoryId',
      label: '分类',
      component: 'ApiSelect',
      componentProps: {
        api: () => getCategoryList(),
        labelField: 'categoryName',
        valueField: 'id',
        placeholder: '请选择分类',
        allowClear: true,
      },
    },
  ];
}

/** 表格列定义 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'id', title: '编号', minWidth: 80 },
    { field: 'title', title: '标题', minWidth: 240 },
    { field: 'categoryName', title: '分类', minWidth: 120 },
    {
      field: 'status',
      title: '状态',
      minWidth: 100,
      cellRender: { name: 'CellDict', props: { type: DICT_TYPE.BLOG_ARTICLE_STATUS } },
    },
    { field: 'visitCount', title: '访问量', minWidth: 100 },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    { title: '操作', width: 200, fixed: 'right', slots: { default: 'actions' } },
  ];
}
