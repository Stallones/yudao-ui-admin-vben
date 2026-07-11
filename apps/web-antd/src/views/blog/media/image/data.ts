import type { VbenFormSchema } from '#/adapter/form';
import type { VxeTableGridOptions } from '#/adapter/vxe-table';

export const IMAGE_TYPE_OPTIONS = [
  { label: '封面图 (51)', value: 51 },
  { label: '轮播图 (52)', value: 52 },
  { label: 'banner图 (53)', value: 53 },
];

export const IMAGE_TYPE_MAP: Record<number, string> = {
  51: '封面图',
  52: '轮播图',
  53: 'banner图',
};

/** 编辑表单 Schema */
export function useFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'id',
      dependencies: { triggerFields: [''], show: () => false },
    },
    {
      fieldName: 'type',
      label: '类型',
      component: 'Select',
      componentProps: {
        options: IMAGE_TYPE_OPTIONS,
        placeholder: '请选择类型',
      },
      rules: 'required',
    },
    {
      fieldName: 'path',
      label: '图片',
      component: 'ImageUpload',
      componentProps: { maxNumber: 1 },
    },
    {
      component: 'InputNumber',
      fieldName: 'sort',
      label: '排序',
      componentProps: { placeholder: '请输入排序', min: 0 },
    },
  ];
}

/** 搜索表单 Schema */
export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      fieldName: 'type',
      label: '类型',
      component: 'Select',
      componentProps: {
        options: IMAGE_TYPE_OPTIONS,
        placeholder: '请选择类型',
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
    {
      field: 'type',
      title: '类型',
      minWidth: 120,
      formatter: ({ cellValue }) =>
        (IMAGE_TYPE_MAP as Record<number, string>)[cellValue as number] ?? cellValue,
    },
    { field: 'path', title: '图片', minWidth: 120, cellRender: { name: 'CellImage' } },
    { field: 'sort', title: '排序', minWidth: 80 },
    {
      field: 'createTime',
      title: '创建时间',
      minWidth: 180,
      formatter: 'formatDateTime',
    },
    { title: '操作', width: 160, fixed: 'right', slots: { default: 'actions' } },
  ];
}
