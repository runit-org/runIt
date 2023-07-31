import axios from "axios";
import { GET_ERRORS, GET_ALL_NOTIFS } from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getNotifications = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/notifications/all/`)
      .then((res) => {
        dispatch({
          type: GET_ALL_NOTIFS,
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

export const notificationRead = (id) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .patch(`/notifications/read/${id}/`)
      .then((res) => {
        dispatch(getNotifications());
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};

export const notificationRead_all = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .patch(`/notifications/readAll/`)
      .then((res) => {
        dispatch(getNotifications());
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};
