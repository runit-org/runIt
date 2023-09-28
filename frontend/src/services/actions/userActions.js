import axios from "axios";
import {
  GET_ERRORS,
  GET_USER_PROFILE,
  GET_CURRENT_USER_PROFILE,
  SET_CURRENT_USER,
  GET_VOTES,
  GET_USER_ACTIVITY,
} from "../constants/types";
import { setToken, refreshToken } from "../../securityUtils/setToken";
import { OK } from "../constants/responseStatus";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

export const getUserProfile = (userName) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    return axios
      .get(`/user/profile/${userName}/`)
      .then((res) => {
        dispatch({
          type: GET_USER_PROFILE,
          payload: res.data,
        });
        return res;
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error.response;
      });
  });
};

export const getCurrentUserProfile = () => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/user/me/`)
      .then((res) => {
        dispatch({
          type: GET_CURRENT_USER_PROFILE,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
        dispatch({
          type: SET_CURRENT_USER,
          payload: null,
        });
      });
  });
};

export const vote = (id, postData) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    return axios
      .post(`/user/vote/${id}/`, postData)
      .then((res) => {
        return res;
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error;
      });
  });
};

export const userStatus = (postData, setLoad, setError) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    setLoad(true);
    return axios
      .put(`/user/updateStatusMessage/`, postData)
      .then((res) => {
        setLoad(false);
        setError(res.data);
        return res;
      })
      .catch((error) => {
        setLoad(false);
        setError(error.response.data);
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
        return error;
      });
  });
};

export const getVotes = (page) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`/user/vote/?page=${page}`)
      .then((res) => {
        dispatch({
          type: GET_VOTES,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
      });
  });
};

export const updateDetails =
  (postData, setLoad, navigate) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);
      setLoad(true);
      axios
        .put(`/user/updateDetails/`, postData)
        .then((res) => {
          if (res.status === OK) {
            setLoad(false);
            navigate(`/`);
          }
        })
        .catch((error) => {
          setLoad(false);
          dispatch({
            type: GET_ERRORS,
            payload: error.response,
          });
        });
    });
  };

export const changePassword = (postData, setLoad) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    setLoad(true);
    return axios
      .put(`/user/changePassword/`, postData)
      .then((res) => {
        if (res.status === OK) {
          setLoad(false);
        }
        return res;
      })
      .catch((error) => {
        setLoad(false);
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
        return error;
      });
  });
};

export const getActivity = (userName, setLoad) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    setLoad(true);
    axios
      .get(`/user/activity/${userName}/`)
      .then((res) => {
        if (res.status === OK) {
          dispatch({
            type: GET_USER_ACTIVITY,
            payload: res.data,
          });
          setLoad(false);
        }
      })
      .catch((error) => {
        setLoad(false);
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      });
  });
};

export const feedback = (postData, setLoad) => async (dispatch) => {
  return await refreshToken().then(async (ref) => {
    setToken(ref.data.access);
    setLoad(true);
    return axios
      .post(`/feedback/create/`, postData)
      .then((res) => {
        if (res.status === OK) {
          setLoad(false);
        }

        return res;
      })
      .catch((error) => {
        setLoad(false);
        dispatch({
          type: GET_ERRORS,
          payload: error.response,
        });
        return error;
      });
  });
};
