import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../../services/actions/commentActions";
import {
  affiliatedEvents,
  getAllEvents,
  getEventMembers,
  getSingleEvent,
} from "../../../services/actions/eventActions";
import { OK } from "../../../services/constants/responseStatus";

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

  useEffect(() => {
    dispatch(getSingleEvent(params.id)).then((res) => {
      if (res.status === OK) {
        dispatch(getAllComments(params.id, pageId ? pageId : 1));
      }
    });
  }, [dispatch, params.id, pageId]);

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
