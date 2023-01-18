import { defHttp } from '/@/utils/http/axios';
import {
  LoginParams,
  RegisterParams,
  LoginResultModel,
  GetUserInfoModel,
  EditUserInfoParams,
} from './model/userModel';

import { ErrorMessageMode } from '/#/axios';

enum Api {
  Login = '/api/login',
  Register = '/api/register',
  Logout = '/logout',
  GetUserInfo = '/getUserInfo',
  EditUserInfo = '/editUserInfo',
  validateEmail = '/validEmail',
  validateUsername = '/validUsername',
  updatePassword = '/updatePassword',
  GetPermCode = '/getPermCode',
  TestRetry = '/testRetry',
}

/**
 * @description: user login api
 */
export function loginApi(params: LoginParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<LoginResultModel>(
    {
      url: Api.Login,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

/**
 * @description: user register api
 */
export function registerApi(params: RegisterParams, mode: ErrorMessageMode = 'modal') {
  return defHttp.post({ url: Api.Register, params }, { apiUrl: '/api', errorMessageMode: mode });
}

/**
 * @description: getUserInfo
 */
export function getUserInfo() {
  return defHttp.get<GetUserInfoModel>(
    { url: Api.GetUserInfo },
    { apiUrl: '/api', errorMessageMode: 'none' },
  );
}

/**
 * @description: edit userinfo api
 */
export function editUserInfo(params: any, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    { url: Api.EditUserInfo, params },
    { apiUrl: '/api', errorMessageMode: mode },
  );
}

/**
 * @description: 验证邮箱是否有效
 */
export function validateEmail(params: any) {
  return defHttp.get({ url: Api.validateEmail, params }, { apiUrl: '/api' });
}
/**
 * @description: 验证用户名是否有效
 */
export function validateUsername(params: any) {
  return defHttp.get({ url: Api.validateUsername, params }, { apiUrl: '/api' });
}

/**
 * @description: 修改密码
 */
export function updatePassword(params: any) {
  return defHttp.post({ url: Api.updatePassword, params }, { apiUrl: '/api' });
}

export function getPermCode() {
  return defHttp.get<string[]>({ url: Api.GetPermCode });
}

export function doLogout() {
  return defHttp.get({ url: Api.Logout });
}

export function testRetry() {
  return defHttp.get(
    { url: Api.TestRetry },
    {
      retryRequest: {
        isOpenRetry: true,
        count: 5,
        waitTime: 1000,
      },
    },
  );
}
