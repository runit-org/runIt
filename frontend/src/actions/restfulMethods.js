import axios from "axios";
import { GET_ERRORS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

export const GetApi = (api, dispatchType) => async (dispatch) => {
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios.get(api).then((res) => {
      dispatch({
        type: dispatchType,
        payload: res.data,
      });
    });
  });
};

export const PostApi =
  (api, data, dispatchType, setLoad, setError, reLoad) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);
      if (setLoad) {
        setLoad(true);
      }
      axios
        .post(api, data)
        .then((res) => {
          if (res.data.success == "true") {
            setLoad(false);
            setError(res.data.message);
            if(reLoad){
             window.location.reload();
            }
          }
          dispatch({
            type: dispatchType,
            payload: res.data,
          });
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data.message);

          dispatch({
            type: dispatchType,
            payload: error.response.data,
          });
        });
    });
  };
