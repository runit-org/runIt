import { GET_ERRORS, GET_ALL_NOTIFS } from "../constants/types";
import { securedGet, securedPatch } from "../../securityUtils/securedAxios";

export const getNotifications = () => async (dispatch) => {
  const apiEndpoint = `/notifications/all/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_ALL_NOTIFS);
};

export const notificationRead = (id) => async (dispatch) => {
  const apiEndpoint = `/notifications/read/${id}/`;
  return await securedPatch(dispatch, apiEndpoint, null, GET_ERRORS);
};

export const notificationRead_all = () => async (dispatch) => {
  const apiEndpoint = `/notifications/readAll/`;
  return await securedPatch(dispatch, apiEndpoint, null, GET_ERRORS);
};
