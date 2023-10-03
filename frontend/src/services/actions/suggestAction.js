import { GET_EVENT_SUGGESTIONS } from "../constants/types";
import { securedGet } from "../../securityUtils/securedAxios";

export const getSuggestions = (id, setIsLoading) => async (dispatch) => {
  const apiEndpoint = `/event/createSuggestions/${id}/`;
  return await securedGet(
    dispatch,
    apiEndpoint,
    null,
    GET_EVENT_SUGGESTIONS,
    setIsLoading
  );
};
