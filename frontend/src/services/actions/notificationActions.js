import { GET_ALL_NOTIFS, GET_SUCCESS } from "../constants/types";
import { securedGet, securedPatch } from "../../securityUtils/securedAxios";
import * as ApiTypes from "../constants/apiTypes";

const { UPDATE_NOTIF, UPDATE_ALL_NOTIF } = ApiTypes;

export const getNotifications = () => async (dispatch) => {
  const apiEndpoint = `/notifications/all/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_ALL_NOTIFS);
};

export const notificationRead = (id) => async (dispatch) => {
  const apiEndpoint = `/notifications/read/${id}/`;
  return await securedPatch(
    dispatch,
    apiEndpoint,
    null,
    GET_SUCCESS,
    UPDATE_NOTIF
  );
};

export const notificationRead_all = () => async (dispatch) => {
  const apiEndpoint = `/notifications/readAll/`;
  return await securedPatch(
    dispatch,
    apiEndpoint,
    null,
    GET_SUCCESS,
    UPDATE_ALL_NOTIF
  );
};
