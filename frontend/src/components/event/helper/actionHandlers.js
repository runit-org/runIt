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
import { GetParamFromURL } from "../../../utilities/utility-service";

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
    dispatch(getSingleEvent(params.id)).then(({ status }) => {
      if (status === OK) {
        dispatch(getAllComments(params.id, pageId ? pageId : 1));
      } else if (status === BAD_REQUEST || status === SERVER_ERROR) {
        navigate("*");
      }
    });
  }, [dispatch, params.id, pageId, navigate]);

  var event = useSelector((securityReducer) => securityReducer.events.event);
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

export const EventHandler = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [eventData, setEventData] = useState([]);

  //reducer data
  var allEventsData = useSelector((eventReducer) => eventReducer.events.events);

  const { currentPage, next, count } = allEventsData;

  //get data on initial load
  useEffect(() => {
    if (currentPage === 0) {
      dispatch(getAllEvents(1, setLoad));
    }
  }, [dispatch, currentPage]);

  //get data when traversing page
  const handleLoadMore = () => {
    if (next) {
      let pageParam = GetParamFromURL(next, "page");
      dispatch(getAllEvents(pageParam, setLoad));
    }
  };

  useEffect(() => {
    if (allEventsData.results) setEventData(allEventsData.results);
  }, [allEventsData]);

  return {
    load,
    eventData,
    handleLoadMore,
    count,
    hasMore: !!next,
  };
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
