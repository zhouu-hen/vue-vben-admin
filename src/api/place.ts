import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/#/axios';

enum Api {
  AddPlace = '/addPlace',
  GetPlaceList = '/getPlaceList',
  DeletePlaceById = '/deletePlaceById',
  SetPlaceStatus = '/setPlaceStatus',
}

/**
 * @description: 添加场地
 */
export function addPlace(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.AddPlace,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

export function getPlaceList(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.post(
    {
      url: Api.GetPlaceList,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

export function deletePlaceById(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: Api.DeletePlaceById,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}

export function setPlaceStatus(params, mode: ErrorMessageMode = 'modal') {
  return defHttp.get(
    {
      url: Api.SetPlaceStatus,
      params,
    },
    {
      apiUrl: '/api',
      errorMessageMode: mode,
    },
  );
}
