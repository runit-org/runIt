import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../../services/actions/commentActions";
import {
  affiliatedEvents,
  getAllEvents,
  getEventMembers,
  getSingleEvent,
} from "../../../services/actions/eventActions";
import {
  BAD_REQUEST,
  OK,
  SERVER_ERROR,
} from "../../../services/constants/responseStatus";
import { useNavigate } from "react-router-dom";

export const EventMembersHandler = (eventId) => {
  const dispatch = useDispatch();
  const [eventMbs, setEventMbs] = useState([]);

  useEffect(() => {
    if (eventId) {
      dispatch(getEventMembers(eventId));
    }
  }, [dispatch, eventId]);

  var allEventMembers = useSelector(
    (eventReducer) => eventReducer.events.eventMembers.data
  );
  useEffect(() => {
    if (allEventMembers) {
      setEventMbs(allEventMembers);
    }
  }, [allEventMembers]);

  return eventMbs;
};

export const SingleEventHandler = (params, pageId) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    dispatch(getSingleEvent(params.id)).then((res) => {
      let { status } = res;
      if (status === OK) {
        dispatch(getAllComments(params.id, pageId ? pageId : 1));
      } else if (status === BAD_REQUEST || status === SERVER_ERROR) {
        navigate("*");
      }
    });
  }, [dispatch, params.id, pageId, navigate]);

  var event = useSelector((securityReducer) => securityReducer.events.events);
  var comments = useSelector(
    (commentReducer) => commentReducer.comments.comments
  );

  useEffect(() => {
    if (event) {
      setEventData(event.data);
    }
    if (comments) {
      setCommentData(comments);
    }
  }, [event, comments]);

  return { eventData, commentData };
};

/* export const EventHandler = (initialPage = 1) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);
  const [currentPage, setCurrentPage] = useState(initialPage);

  useEffect(() => {
    dispatch(getAllEvents(currentPage));
  }, [dispatch, currentPage]);

  const { events: allEventsData } = useSelector(
    (eventReducer) => eventReducer.events
  );

  useEffect(() => {
    if (allEventsData.results) {
      setEventData((prevData) => {
        const newEventData = [...prevData, ...allEventsData.results];
        const uniqueEventData = newEventData.filter(
          (event, index, self) =>
            self.findIndex((e) => e.id === event.id) === index
        );
        return uniqueEventData;
      });
    }
  }, [allEventsData]);

  const handleShowMore = () => {
    // Increment the currentPage and fetch the next set of events when the "Show More" button is clicked
    const nextPage = currentPage + 1;
    dispatch(getAllEvents(nextPage));
    setCurrentPage(nextPage);
  };

  console.log(eventData);
  return { eventData, handleShowMore };
}; */
export const EventHandler = (pageId) => {
  const dispatch = useDispatch();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(getAllEvents(pageId ? pageId : 1));
  }, [dispatch, pageId]);

  var allEventsData = useSelector((eventReducer) => eventReducer.events.events);
  useEffect(() => {
    if (allEventsData) {
      setEventData(allEventsData);
    }
  }, [allEventsData]);

  return eventData;
};

export const AffiliatedEvents = (filter) => {
  const dispatch = useDispatch();
  const [affiliatedData, setAffiliatedData] = useState([]);
  var res = useSelector((eventReducer) => eventReducer.events.affiliatedData);

  useEffect(() => {
    dispatch(affiliatedEvents(filter ? filter : ""));
  }, [dispatch, filter]);

  useEffect(() => {
    if (res) {
      setAffiliatedData(res);
    }
  }, [res]);

  return affiliatedData;
};
