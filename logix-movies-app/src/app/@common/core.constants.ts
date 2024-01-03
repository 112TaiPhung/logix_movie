export const LOGIN_INFO = 'dkr.login.info';
export const USER_ID = 'dkr.user.id';
export const PERMISSIONS = 'dkg.current.permission';

export const CURRENT_USER = 'dkr.current.user';
export const TOKEN_USER = 'dkr.current.token';
export const ROLES_USER = 'dkr.current.roles';

export const PAGE_LOGIN = '/authentication/login';
export const PAGE_REGISTER = '/authentication/register';
export const PAGE_HOME = '/';

export const TOASTR_TITLE = 'Tập Đoàn Danh Khôi';
export const TOASTR_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFORMATION: 'info',
};
export const APPLICATION_CODE = 'DKS3';
export const IMAGE_EMPTY = '../../assets/img/user-empty.png';

export const FORMAT_NUMBER = '1.0-4';
export const PAGING_LIMIT = 'dkrh.paging.limit';
export const LIMIT_LIST = [10, 20, 50, 100];
export const PAGING_DEFAULT = { total: 0, page: 1, limit: 10 };

export const SERVER_FORMAT_DATETIME = {
  DATE: 'YYYY-MM-DD',
  DATETIME: 'YYYY-MM-DDTHH:mm:ss',
};

export const STATUS_NOTIFY_TYPE = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFORMATION: 'info',
};

export const STATUS_EDIT = {
  UPDATE: 'Update',
  ADJUSTED: 'Adjusted',
};

export const FORMAT_DATETIME = {
  FULL_DATE: 'Do MMMM YYYY',
  FULL_DATETIME: 'Do MMMM YYYY, h:mm:ss a',
  DATE: 'DD/MM/YYYY',
  DATE_EN: 'YYYY-MM-DD',
  DATETIME: 'DD/MM/YYYY hh:mm',
  DATETIME_12HOUR: 'DD-MM-YYYY hh:mm A',
  DAY_OF_WEEK: 'dddd',
  CUSTOM_FULL_DATE: 'MMM D, YYYY',
  DATE_STANDALONE: 'DD',
  DAY_STANDALONE: 'ddd',
  MONTH_STANDALONE: 'MMM',
  MONTH_YEAR: 'MM/YYYY',
  ONLY_YEAR: 'YYYY',
};

export const ROLES = {
  SuperAdmin: { text: 'Quản trị', code: 'SuperAdmin' },
  Bod: { text: 'Tổng giám đốc', code: 'BOD' },
  Admin: { text: 'Văn phòng TGĐ', code: 'Admin' },
  Manager: { text: 'Giám đốc', code: 'Manager' },
  Leader: { text: 'Trưởng phòng', code: 'Leader' },
  Employee: { text: 'Nhân viên', code: 'Employee' },
};

export const BsModalConfig = {
  backdrop: true,
  ignoreBackdropClick: true,
  keyboard: false,
};

export const T = 1;
export const ROUTERS = {
  AUTHENTICATION: 'authentication',
  ADMIN: {
    BASE: 'admin',
    ACCOUNTS: 'accounts',
    PROJECT: 'project',
    BOUGHT: 'bought',
    PRODUCT: 'product',
    CONFIG: 'config',
    NOTIFY: 'notify',
    ROLES: 'roles',
    ROLES_ASSIGN: 'assign',
    ROLES_USERS: 'users',
    PROFILE: 'profile',
    NEWS: 'news',
    GROUP_NEWS: 'group',
    LIST_NEW: 'list',
  },
  USER: {
    BASE: '',
    INTRODUCE: 'introduce',
    PRODUCT: 'product',
    NEWS: 'news',
  },
};

export const CONFIGS = {
  BANNER: 'Banner',
  BANNER_TEXT: 'BannerText',
  ADDRESS: 'AddressHCM',
  EMAIL: 'Email',
  HOTLINE: 'Hotline',
  ZALO: 'Zalo',
  INTRODUCE: 'Introduce',
  LOGO: 'Logo',
  LOGO_MINI: 'LogoMini',
};

export const FILE_TYPE_UPLOAD = {
  IMAGE: 'image',
  DOCUMENT: 'document',
};

export const SKIP_INTERCEPTOR = 'X-Skip-Interceptor';

export const CONTENT_TYPE = {
  APPLICATION_JSON: 'application/json',
  FORM_DATA: 'multipart/form-data boundary=------WebKitFormBoundaryf9mqr6gKpy4pWGeO',
};
