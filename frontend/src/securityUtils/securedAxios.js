import axios from "axios";
import { refreshToken, setToken } from "./setToken";
import { GET_ERRORS } from "../services/constants/types";
import * as ResponseStatus from "../services/constants/responseStatus";

axios.defaults.baseURL = `${
  process.env.NODE_ENV === "production"
    ? process.env.REACT_APP_PROD
    : process.env.REACT_APP_DEV
}/api`;

//get
const securedGet = async (
  dispatch,
  api,
  body = {},
  successType,
  setLoad = null,
  setError = null
) => {
  try {
    const ref = await refreshToken();
    setToken(ref.data.access);
    if (setLoad) setLoad(true);
    const res = await axios.get(api, body);

    if (res.status === ResponseStatus.OK) {
      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(res.status);
      }
      dispatch({
        type: successType,
        payload: res.data,
      });
      return res;
    }
  } catch (error) {
    if (setLoad) {
      setLoad(false);
    }
    if (setError) {
      setError(error.response.data);
    }
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });

    return error.response;
  }
};

//post
const securedPost = async (
  dispatch,
  api,
  body = {},
  successType,
  callType,
  setLoad = null,
  setError = null
) => {
  try {
    const ref = await refreshToken();
    setToken(ref.data.access);

    if (setLoad) setLoad(true);
    const res = await axios.post(api, body);

    if (res.status === ResponseStatus.OK) {
      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(res.status);
      }
      dispatch({
        type: successType,
        payload: { res: res.data, callType: callType },
      });
      return res;
    }
  } catch (error) {
    if (setLoad) {
      setLoad(false);
    }

    if (setError) {
      setError(error.response.data);
    }

    dispatch({
      type: GET_ERRORS,
      payload: error.response,
    });
    return error;
  }
};

//put
const securedPut = async (
  dispatch,
  api,
  body = {},
  successType,
  callType,
  setLoad = null,
  setError = null
) => {
  try {
    const ref = await refreshToken();
    setToken(ref.data.access);

    if (setLoad) setLoad(true);
    const res = await axios.put(api, body);

    if (res.status === ResponseStatus.OK) {
      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(res.status);
      }
      dispatch({
        type: successType,
        payload: { res: res.data, callType: callType },
      });
      return res;
    }
  } catch (error) {
    if (setLoad) {
      setLoad(false);
    }

    if (setError) {
      setError(error.response.data);
    }

    dispatch({
      type: GET_ERRORS,
      payload: error.response,
    });
    return error;
  }
};

//delete
const securedDelete = async (
  dispatch,
  api,
  body = {},
  successType,
  callType,
  setLoad = null,
  setError = null
) => {
  try {
    const ref = await refreshToken();
    setToken(ref.data.access);

    if (setLoad) setLoad(true);
    const res = await axios.delete(api, body);

    if (res.status === ResponseStatus.OK) {
      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(res.status);
      }
      dispatch({
        type: successType,
        payload: { res: res.data, callType: callType },
      });
      return res;
    }
  } catch (error) {
    if (setLoad) {
      setLoad(false);
    }

    if (setError) {
      setError(error.response.data);
    }

    dispatch({
      type: GET_ERRORS,
      payload: error.response,
    });
    return error;
  }
};

//patch
const securedPatch = async (
  dispatch,
  api,
  body = {},
  successType,
  callType,
  setLoad = null,
  setError = null
) => {
  try {
    const ref = await refreshToken();
    setToken(ref.data.access);

    if (setLoad) setLoad(true);
    const res = await axios.patch(api, body);

    if (res.status === ResponseStatus.OK) {
      if (setLoad) {
        setLoad(false);
      }
      if (setError) {
        setError(res.status);
      }
      dispatch({
        type: successType,
        payload: { res: res.data, callType: callType },
      });
      return res;
    }
  } catch (error) {
    if (setLoad) {
      setLoad(false);
    }

    if (setError) {
      setError(error.response.data);
    }

    dispatch({
      type: GET_ERRORS,
      payload: error.response,
    });
    return error;
  }
};

export { securedGet, securedPost, securedPut, securedDelete, securedPatch };
