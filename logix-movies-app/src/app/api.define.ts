import { environment } from '../environments/environment';

export const BASE_API_URL = `${environment.baseApi}/api`;
export const UPLOAD_FILE_API_URL = `${environment.apiUploadFile}/api`;
export const APP_CODE_UPLOAD = 'dfi';
export const API_VERSION_1 = 'v1';
export const CACHE_URL = 'isCacheUrl=true';
export const CRYPTO_KEY = 'UmZValhuMnI1dTh4IUElRCpHLUthUGRTZ1ZrWXAzczY=';
export const CRYPTO_VI = 'JUMqRi1KYU5kUmdVa1huMg==';
export const API_SERVICES = {
  ACCOUNTS: {
    AUTHENTICATE: `${BASE_API_URL}/accounts/authenticate`,
    CACHE_PERMISSIONS: `${BASE_API_URL}/accounts/:id/permissions`,
    REGISTER: `${BASE_API_URL}/accounts/register`,
    LOGOUT: `${BASE_API_URL}/accounts/logout`,
    PERMISSIONS: `${BASE_API_URL}/accounts/:id/permissions`,
    GET_ALL: `${BASE_API_URL}/accounts`,
    GET_GENDER: `${BASE_API_URL}/accounts/gender`,
    PUT: `${BASE_API_URL}/accounts`,
    RESET_PWD: `${BASE_API_URL}/accounts/reset-password-by-userid`,
    RESET_PWD_MANUAL: `${BASE_API_URL}/accounts/reset-password`,
    GET_BY_ID: `${BASE_API_URL}/accounts/:id`,
    UPDATE_USER: `${BASE_API_URL}/accounts`,
    UPDATE_PROFILE: `${BASE_API_URL}/accounts/:id/profile`,
    CHANGE_PASSWORD: `${BASE_API_URL}/accounts/:id/change-password`,
    CHANGE_STATUS: `${BASE_API_URL}/accounts/lock`,
    ASSIGN_PROJECT: `${BASE_API_URL}/accounts/assign-project`,
    ASSIGN_PROJECT_FOR_USER: `${BASE_API_URL}/accounts/assigned-project/user`,
  },
  POSITIONS: {
    GET_ALL: `${BASE_API_URL}/positions/paging`,
  },
  PAGING: 'paging',
  CHANGE_STATUS: 'change-status',
  CHANGE_STATUS_VIEW_WEB: 'change-status-view-web',
  VIEW_DETAIL: 'view-detail',
  MOVIE: {
    POST: `${BASE_API_URL}/movies/`,
    PAGING: `${BASE_API_URL}/movies/paging`,
    LIKEMOVIE: `${BASE_API_URL}/movies/:id/like-movie`,
  },
  PERMISSIONS: {
    GET_ALL: `${BASE_API_URL}/roles`,
    POST: `${BASE_API_URL}/roles`,
    PUT: `${BASE_API_URL}/roles`,
    DELETE: `${BASE_API_URL}/roles?id=:id`,
    GET_PERMISSIONS: `${BASE_API_URL}/Permissions/:id/role-permission`,
    GET_GROUP_PERMISSIONS: `${BASE_API_URL}/Permissions/group-permissions`,
  },
};
