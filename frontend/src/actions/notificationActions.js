import axios from "axios";
import { GET_ERRORS, GET_ALL_NOTIFS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

export const getNotifications = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/notifications/all/`)
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

export const notificationRead = (id, setReadStatus) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .patch(`http://localhost:8000/api/notifications/read/${id}/`)
      .then((res) => {
        setReadStatus(res.data.success);
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};
