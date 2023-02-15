import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  addEquip = '/addEquip',
  GetEquipList = '/getEquipList',
  DeleteEquipById = '/deleteEquipById',
  setEquipStatus = '/setEquipStatus'
}

/**
 * @description: 添加场地
 */
export function addEquip(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.addEquip,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

export function getEquipList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.GetEquipList,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

export function deleteEquipById(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: Api.DeleteEquipById,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

export function setEquipStatus(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: Api.setEquipStatus,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}
