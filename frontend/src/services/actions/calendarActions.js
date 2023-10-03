import { GET_MONTHLY_EVENTS, GET_DAY_EVENTS } from "../constants/types";
import { securedGet } from "../../securityUtils/securedAxios";

export const getMonthlyEvents = (id, month, year) => async (dispatch) => {
  const apiEndpoint = `/event/getMonthYear/${id}/${month}-${year}/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_MONTHLY_EVENTS);
};

export const getDayEvents = (id, date, month, year) => async (dispatch) => {
  const apiEndpoint = `/event/getPerDate/${id}/${date}-${month}-${year}/`;
  return await securedGet(dispatch, apiEndpoint, null, GET_DAY_EVENTS);
};
