import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSuggestions } from "../../../services/actions/suggestAction";

export const EventSuggestHandler = (pageId) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  var allSuggestData = useSelector(
    (suggestReducer) => suggestReducer.suggestions.suggestEvent
  );

  useEffect(() => {
    let isMounted = true;
    const fetchData = () => {
      if (isMounted) {
        dispatch(getSuggestions(pageId ? pageId : 1, setIsLoading));
      }
    };

    // Fetch data on initial load if there is no data in sessionStorage
    const storedData = sessionStorage.getItem("initialFetch");

    if (!JSON.parse(storedData)) {
      fetchData();
      sessionStorage.setItem("initialFetch", true);
    }

    const intervalId = setInterval(fetchData, 300000); //call api every 5 minutes

    return () => {
      clearInterval(intervalId);
      isMounted = false;
    };
  }, [dispatch, pageId]);

  const suggestData = useMemo(() => {
    if (Object.keys(allSuggestData).length > 0) {
      const storedData = sessionStorage.getItem("suggestData");
      if (storedData) {
        console.log("sess");
        return JSON.parse(storedData);
      } else {
        console.log("api");
        sessionStorage.setItem("suggestData", JSON.stringify(allSuggestData));
        return allSuggestData;
      }
    }
    return [];
  }, [allSuggestData]);

  return { suggestData, isLoading };
};
