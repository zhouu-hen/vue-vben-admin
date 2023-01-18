import { FormSchema } from '/@/components/Form/index';
import type { Rule } from 'ant-design-vue/es/form';
import { validateEmail, validateUsername } from '/@/api/sys/user';

export interface ListItem {
  key: string;
  title: string;
  description: string;
  extra?: string;
  avatar?: string;
  color?: string;
}

// tab的list
export const settingList = [
  {
    key: '1',
    name: '基本设置',
    component: 'BaseSetting',
  },
  {
    key: '2',
    name: '安全设置',
    component: 'SecureSetting',
  },
  {
    key: '3',
    name: '新消息通知',
    component: 'MsgNotify',
  },
];

// 基础设置 form
const emailReg = /^[a-zA-Z0-9]+([-_.][A-Za-zd]+)*@([a-zA-Z0-9]+[-.])+[A-Za-zd]{2,5}$/;
const validEmail = async (_rule: Rule, value: string) => {
  if (!emailReg.test(value)) return Promise.reject(new Error(`${value} 邮箱格式有误`));
  await validateEmail({ email: value });
};
const validUsername = async (_rule: Rule, value: string) => {
  if (value.length < 5) return Promise.reject(new Error(`用户名长度至少五位`));
  await validateUsername({ username: value });
};

export const baseSetschemas: FormSchema[] = [
  {
    field: 'email',
    component: 'Input',
    label: '邮箱',
    colProps: { span: 18 },
    rules: [
      {
        type: 'email',
        required: true,
      },
      { validator: validEmail, trigger: 'blur' },
    ],
  },
  {
    field: 'username',
    component: 'Input',
    label: '用户名',
    colProps: { span: 18 },
    rules: [
      {
        required: true,
      },
      { validator: validUsername, trigger: 'blur' },
    ],
  },
  {
    field: 'phone',
    component: 'Input',
    label: '联系电话',
    colProps: { span: 18 },
  },
  {
    field: 'role',
    component: 'Input',
    label: '部门角色',
    colProps: { span: 18 },
    dynamicDisabled: true,
  },
  {
    field: 'introduction',
    component: 'InputTextArea',
    label: '个人简介',
    colProps: { span: 18 },
  },
];

// 安全设置 list
export const secureSettingList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '当前密码强度：：强',
    extra: '修改',
  },
  {
    key: '2',
    title: '密保手机',
    description: '已绑定手机：：138****8293',
    extra: '修改',
  },
  {
    key: '3',
    title: '密保问题',
    description: '未设置密保问题，密保问题可有效保护账户安全',
    extra: '修改',
  },
  {
    key: '4',
    title: '备用邮箱',
    description: '已绑定邮箱：：ant***sign.com',
    extra: '修改',
  },
];

// 新消息通知 list
export const msgNotifyList: ListItem[] = [
  {
    key: '1',
    title: '账户密码',
    description: '其他用户的消息将以站内信的形式通知',
  },
  {
    key: '2',
    title: '系统消息',
    description: '系统消息将以站内信的形式通知',
  },
  {
    key: '3',
    title: '待办任务',
    description: '待办任务将以站内信的形式通知',
  },
];
