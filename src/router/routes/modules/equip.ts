import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const account: AppRouteModule = {
  path: '/equip',
  name: 'Equip',
  component: LAYOUT,
  redirect: '/equip/index',
  meta: {
    hideChildrenInMenu: true,
    title: '器材管理',
    orderNo: 21,
  },
  children: [
    {
      path: 'index',
      name: 'EquipIndex',
      component: () => import('/@/views/equipment/index.vue'),
      meta: {
        title: '器材管理',
      },
    },
  ],
};

export default account;
