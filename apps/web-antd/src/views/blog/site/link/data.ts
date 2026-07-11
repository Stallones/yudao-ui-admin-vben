import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';
import { DICT_TYPE } from '@vben/constants';
import { getDictOptions } from '@vben/hooks';

/** 编辑表单 Schema */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: { triggerFields: [''], show: () => false },
    },
    {
      component: 'Input',
      fieldName: 'name',
      label: '名称',
      componentProps: { placeholder: '请输入友链名称' },
      rules: 'required',
    },
    {
      component: 'Input',
      fieldName: 'url',
      label: '链接',
      componentProps: { placeholder: '请输入链接' },
      rules: 'required',
    },
    {
      component: 'Textarea',
      fieldName: 'description',
      label: '描述',
      componentProps: { placeholder: '请输入描述', rows: 3 },
    },
    {
      component: 'Input',
      fieldName: 'email',
      label: '邮箱',
      componentProps: { placeholder: '请输入邮箱' },
    },
    {
      component: 'Input',
      fieldName: 'background',
      label: '背景图',
      componentProps: { placeholder: '请输入背景图URL' },
    },
    {
      fieldName: 'isCheck',
      label: '审核状态',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.BLOG_LINK_CHECK_STATUS, 'number'),
        placeholder: '请选择审核状态',
      },
    },
  ];
}

/** 搜索表单 Schema */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'name',
      label: '名称',
      component: 'Input',
      componentProps: { placeholder: '请输入名称', allowClear: true },
    },
    {
      fieldName: 'isCheck',
      label: '审核状态',
      component: 'Select',
      componentProps: {
        options: getDictOptions(DICT_TYPE.BLOG_LINK_CHECK_STATUS, 'number'),
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
    { field: 'name', title: '名称', minWidth: 140 },
    { field: 'url', title: '链接', minWidth: 220 },
    { field: 'description', title: '描述', minWidth: 200 },
    {
      field: 'isCheck',
      title: '审核状态',
      minWidth: 100,
      cellRender: { name: 'CellDict', props: { type: DICT_TYPE.BLOG_LINK_CHECK_STATUS } },
    },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    { title: '操作', width: 260, fixed: 'right', slots: { default: 'actions' } },
  ];
}
