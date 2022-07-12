import axios from "axios";
import { GET_ERRORS, GET_ALL_NOTIFS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

export const getNotifications = () => async (dispatch) => {
  const ref = await refreshToken().then((ref) => {
    setToken(ref.data.access);
    const res = axios
      .get(`http://localhost:8000/api/notifications/all/`)
      .then((res) => {
        dispatch({
          type: GET_ALL_NOTIFS,
          payload: res.data,
        });
      });
  });
};

export const notificationRead = (id) => async () => {
  const ref = await refreshToken().then((ref) => {
    setToken(ref.data.access);
    const res = axios
      .patch(`http://localhost:8000/api/notifications/read/${id}/`)
      .then((res) => {
        console.log(res)
      });
  });
};
