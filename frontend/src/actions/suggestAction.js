import axios from "axios";
import { refreshToken, setToken } from "../securityUtils/setToken";
import { GET_ERRORS, GET_EVENT_SUGGESTIONS } from "./types";

export const getSuggestions = (id, setIsLoading) => async (dispatch) => {
  setIsLoading(true);
  await refreshToken().then((ref) => {
    setToken(ref.data.access);
    axios
      .get(`http://localhost:8000/api/event/createSuggestions/${id}/`)
      .then((res) => {
        dispatch({
          type: GET_EVENT_SUGGESTIONS,
          payload: res.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ERRORS,
          payload: error.response.data,
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  });
};
