import { PERMISSION_CODE } from 'src/app/@common/app.permission.constants';
import { ROUTERS } from 'src/app/@common/core.constants';

export const navItems = [
  {
    name: 'Sản phẩm',
    url: ROUTERS.ADMIN.PRODUCT,
    icon: 'assets/img/svg/icon-nav-01.svg',
    attributes: {
      permissions: [PERMISSION_CODE.PRODUCT.VIEW_PRODUCT],
    },
  },
  {
    name: 'Dự án',
    url: ROUTERS.ADMIN.PROJECT,
    icon: 'assets/img/svg/icon-nav-02.svg',
    attributes: {
      permissions: [PERMISSION_CODE.PROJECT.VIEW_PROJECT],
    },
  },
  {
    name: 'Đã mua',
    url: ROUTERS.ADMIN.BOUGHT,
    icon: 'assets/img/svg/icon-nav-bought.svg',
    attributes: {
      permissions: [PERMISSION_CODE.PROJECT.VIEW_PROJECT],
    },
  },
  {
    name: 'Tin tức',
    url: ROUTERS.ADMIN.NEWS,
    icon: 'assets/img/svg/icon-nav-news.svg',
    attributes: {
      permissions: [PERMISSION_CODE.SYSTEM.FULL_CONTROL],
    },
  },
  {
    name: 'Tài khoản',
    url: ROUTERS.ADMIN.ACCOUNTS,
    icon: 'assets/img/svg/icon-nav-03.svg',
    attributes: {
      permissions: [PERMISSION_CODE.ACCOUNT.VIEW_ACCOUNT],
    },
  },
  {
    name: 'Phân quyền',
    url: ROUTERS.ADMIN.ROLES,
    icon: 'assets/img/svg/icon-nav-04.svg',
    attributes: {
      permissions: [PERMISSION_CODE.SYSTEM.FULL_CONTROL],
    },
  },
  // {
  //   name: 'Thông báo',
  //   url: ROUTERS.ADMIN.NOTIFY,
  //   icon: 'assets/img/svg/icon-nav-05.svg',
  //   attributes: {
  //     permissions: [PERMISSION_CODE.SYSTEM.FULL_CONTROL],
  //   },
  // },
  {
    name: 'Cấu hình',
    url: ROUTERS.ADMIN.CONFIG,
    icon: 'assets/img/svg/icon-nav-06.svg',
    attributes: {
      permissions: [PERMISSION_CODE.SYSTEM.FULL_CONTROL],
    },
  },
];
