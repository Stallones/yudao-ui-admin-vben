import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

/** 搜索表单 Schema */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'articleId',
      label: '文章ID',
      component: 'InputNumber',
      componentProps: { placeholder: '请输入文章ID', min: 0 },
    },
    {
      fieldName: 'isCheck',
      label: '收藏状态',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.BLOG_FAVORITE_STATUS, 'number'),
        placeholder: '请选择收藏状态',
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
    { field: 'userId', title: '用户ID', minWidth: 100 },
    { field: 'articleId', title: '文章ID', minWidth: 100 },
    {
      field: 'isCheck',
      title: '收藏状态',
      minWidth: 100,
      cellRender: { name: 'CellDict', props: { type: DICT_TYPE.BLOG_FAVORITE_STATUS } },
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    { title: '操作', width: 130, fixed: 'right', slots: { default: 'actions' } },
  ];
}
