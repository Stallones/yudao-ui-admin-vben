import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

import type { BlogCategoryApi } from '#/api/blog/content/category';

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
      fieldName: 'categoryName',
      label: '分类名称',
      componentProps: { placeholder: '请输入分类名称' },
      rules: 'required',
    },
  ];
}

/** 搜索表单 Schema */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'categoryName',
      label: '分类名称',
      component: 'Input',
      componentProps: { placeholder: '请输入分类名称', allowClear: true },
    },
  ];
}

/** 表格列定义 */
export function useGridColumns(): VxeTableGridOptions['columns'] {
  return [
    { type: 'checkbox', width: 40 },
    { field: 'id', title: '编号', minWidth: 100 },
    { field: 'categoryName', title: '分类名称', minWidth: 200 },
    { title: '操作', width: 130, fixed: 'right', slots: { default: 'actions' } },
  ];
}
