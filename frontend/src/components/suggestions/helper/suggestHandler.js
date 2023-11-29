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
    const storedDataCheck = sessionStorage.getItem("initialFetch");

    if (!JSON.parse(storedDataCheck)) {
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
    const storedData = sessionStorage.getItem("suggestData");
    if (Object.keys(allSuggestData).length > 0) {
      sessionStorage.setItem("suggestData", JSON.stringify(allSuggestData));
      return allSuggestData;
    } else {
      return JSON.parse(storedData);
    }
  }, [allSuggestData]);

  return { suggestData, isLoading };
};
