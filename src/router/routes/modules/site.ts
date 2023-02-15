import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';

const account: AppRouteModule = {
  path: '/place',
  name: 'Place',
  component: LAYOUT,
  redirect: '/place/index',
  meta: {
    hideChildrenInMenu: true,
    title: '场地管理',
    orderNo: 20,
  },
  children: [
    {
      path: 'index',
      name: 'PlaceIndex',
      component: () => import('/@/views/place/index.vue'),
      meta: {
        title: '场地管理',
      },
    },
  ],
};

export default account;
