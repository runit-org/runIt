import axios from "axios";
import { refreshToken, setToken } from "../../securityUtils/setToken";
import {
  GET_ERRORS,
  GET_MONTHLY_EVENTS,
  GET_DAY_EVENTS,
} from "../constants/types";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getMonthlyEvents = (id, month, year) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/event/getMonthYear/${id}/${month}-${year}/`)
      .then((res) => {
        dispatch({
          type: GET_MONTHLY_EVENTS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};

export const getDayEvents = (id, date, month, year) => async (dispatch) => {
  await protectedApi(
    dispatch,
    `/event/getPerDate/${id}/${date}-${month}-${year}/`,
    GET_DAY_EVENTS
  );
  /*   await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/event/getPerDate/${id}/${date}-${month}-${year}/`)
      .then((res) => {
        dispatch({
          type: GET_DAY_EVENTS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  }); */
};

export const protectedApi = async (dispatch, api, type) => {
  try {
    const ref = await refreshToken();
    setToken(ref.data.access);
    const res = await axios.get(api);
    dispatch({
      type: type,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};
