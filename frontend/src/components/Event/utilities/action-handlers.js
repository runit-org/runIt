import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllComments } from "../../../actions/commentActions";
import { getEventMembers, getSingleEvent } from "../../../actions/eventActions";

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
    dispatch(getSingleEvent(params.id)).then(() => {
      dispatch(getAllComments(params.id, pageId ? pageId : 1));
    });
  }, [dispatch, params.id, pageId]);

  var event = useSelector((securityReducer) => securityReducer.events.events);
  var comments = useSelector(
    (commentReducer) => commentReducer.comments.events
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
