import axios from "axios";
import { GET_ERRORS } from "./types";
import { setToken, refreshToken } from "../securityUtils/setToken";

export const createComment =
  (id, postData, setLoad, setError) => async (dispatch) => {
    await refreshToken().then((ref) => {
      setToken(ref.data.access);

      setLoad(true);
      axios
        .post(`http://localhost:8000/api/event/comment/create/${id}/`, postData)
        .then((res) => {
          if (res.status === 200) {
            setLoad(false);
            setError(res.status);
          }
          dispatch({
            type: GET_ERRORS,
            payload: res.data,
          });
        })
        .catch((error) => {
          setLoad(false);
          setError(error.response.data.message);
          dispatch({
            type: GET_ERRORS,
            payload: error.response.data,
          });
        });
    });
  };
