import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const account: AppRouteModule = {
  path: '/account',
  name: 'About',
  component: LAYOUT,
  redirect: '/account/index',
  meta: {
    icon: 'simple-icons:about-dot-me',
    title: t('sys.login.userName'),
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'index',
      name: 'AboutPage',
      component: () => import('/@/views/sys/account/index.vue'),
      meta: {
        title: t('sys.login.userName'),
        icon: 'simple-icons:about-dot-me',
        hideMenu: true,
      },
    },
  ],
};

export default account;
