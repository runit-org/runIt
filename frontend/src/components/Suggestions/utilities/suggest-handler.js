import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "../../../actions/suggestAction";

export const EventSuggestHandler = (pageId) => {
  const dispatch = useDispatch();
  const [suggestData, setSuggestData] = useState([]);

  useEffect(() => {
    dispatch(getSuggestions(pageId ? pageId : 1));
  }, [dispatch, pageId]);

  var allSuggestData = useSelector(
    (suggestReducer) => suggestReducer.suggestions.suggestEvent
  );
  useEffect(() => {
    if (allSuggestData) {
      setSuggestData(allSuggestData);
    }
  }, [allSuggestData]);

  return suggestData;
};
