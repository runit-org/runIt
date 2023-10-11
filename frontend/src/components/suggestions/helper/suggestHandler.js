import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "../../../services/actions/suggestAction";

export const EventSuggestHandler = (pageId) => {
  const dispatch = useDispatch();
  const [suggestData, setSuggestData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(getSuggestions(pageId ? pageId : 1, setIsLoading));
  }, [dispatch, pageId]);

  var allSuggestData = useSelector(
    (suggestReducer) => suggestReducer.suggestions.suggestEvent
  );
  useEffect(() => {
    if (allSuggestData) {
      setSuggestData(allSuggestData);
    }
  }, [allSuggestData]);

  return { suggestData, isLoading };
};
