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
import { useNavigate, useParams } from "react-router-dom";
import { GetParamFromURL } from "../../../utilities/utility-service";

export const SingleEventHandler = (pageId) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const { id } = useParams();
  const [eventData, setEventData] = useState([]);
  const [commentData, setCommentData] = useState([]);
  const [eventMbs, setEventMbs] = useState([]);

  useEffect(() => {
    if (id)
      dispatch(getSingleEvent(id)).then(({ status }) => {
        if (status === OK) {
          dispatch(getAllComments(id, pageId ? pageId : 1));
          dispatch(getEventMembers(id));
        } else if (status === BAD_REQUEST || status === SERVER_ERROR) {
          navigate("*");
        }
      });
  }, [dispatch, id, pageId, navigate]);

  var event = useSelector((securityReducer) => securityReducer.events.event);
  var comments = useSelector(
    (commentReducer) => commentReducer.comments.comments
  );
  var allEventMembers = useSelector(
    (eventReducer) => eventReducer.events.eventMembers.data
  );

  useEffect(() => {
    if (event) {
      setEventData(event.data);
    }
    if (comments) {
      setCommentData(comments);
    }
    if (allEventMembers) {
      setEventMbs(allEventMembers);
    }
  }, [event, comments, allEventMembers]);

  return { eventData, commentData, eventMbs };
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
