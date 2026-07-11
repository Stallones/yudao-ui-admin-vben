import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

/** 搜索表单 Schema */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'content',
      label: '内容',
      component: 'Input',
      componentProps: { placeholder: '请输入内容关键字', allowClear: true },
    },
    {
      fieldName: 'isCheck',
      label: '审核状态',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.BLOG_MESSAGE_CHECK_STATUS, 'number'),
        placeholder: '请选择审核状态',
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
    { field: 'content', title: '内容', minWidth: 280 },
    {
      field: 'isCheck',
      title: '审核状态',
      minWidth: 100,
      cellRender: { name: 'CellDict', props: { type: DICT_TYPE.BLOG_MESSAGE_CHECK_STATUS } },
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    { title: '操作', width: 220, fixed: 'right', slots: { default: 'actions' } },
  ];
}
