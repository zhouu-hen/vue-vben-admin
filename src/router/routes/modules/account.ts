import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const account: AppRouteModule = {
  path: '/account',
  name: 'Account',
  component: LAYOUT,
  redirect: '/account/setting',
  meta: {
    hideChildrenInMenu: true,
    title: t('routes.demo.page.accountSetting'),
    orderNo: 20,
  },
  children: [
    {
      path: 'setting',
      name: 'AccountSettingPage',
      component: () => import('/@/views/account/setting/index.vue'),
      meta: {
        title: t('routes.demo.page.accountSetting'),
      },
    },
  ],
};

export default account;
