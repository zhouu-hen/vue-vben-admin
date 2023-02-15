import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Image, Switch } from 'ant-design-vue';
import { setEquipStatus } from '/@/api/equip';
import { formatToDateTime } from '/@/utils/dateUtil';
import { useMessage } from '/@/hooks/web/useMessage';
const { createMessage } = useMessage();
export const columns: BasicColumn[] = [
  {
    title: 'id',
    dataIndex: 'id',
    width: 50,
  },
  {
    title: '器材名称',
    dataIndex: 'name',
    width: 220,
  },
  {
    title: '图片',
    dataIndex: 'photo',
    width: 150,
    customRender: ({ record }) => {
      return h(Image, {
        src: record.photo,
      });
    },
  },
  {
    title: '数量',
    dataIndex: 'num',
  },
  {
    title: '描述',
    dataIndex: 'desc',
  },
  {
    title: '创建时间',
    dataIndex: 'createtime',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(new Date(record.createtime).getTime());
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === 1,
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? 1 : 0;
          setEquipStatus({ id: record.id, status: newStatus })
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改器材状态`);
            })
            .catch(() => {
              createMessage.error('修改器材状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
    },
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'name',
    label: '器材名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'name',
    label: '器材名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'num',
    label: '器材数量',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: 1,
    componentProps: {
      options: [
        { label: '启用', value: 1 },
        { label: '停用', value: 0 },
      ],
    },
  },
  {
    label: '描述',
    field: 'desc',
    component: 'InputTextArea',
  },
  {
    label: ' ',
    field: 'headerImg',
    slot: 'menu',
    component: 'Input',
  },
];
