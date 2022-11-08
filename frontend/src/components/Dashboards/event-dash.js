import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleEvent } from "../../actions/eventActions";
import EventItem from "../Event/event-item";
import ManageMembers from "../Event/manage-members";
import CommentItem from "../Comments/comment-item";

function EventDash() {
  const dispatch = useDispatch();
  const params = useParams();
  const [eventData, setEventData] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  let img = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  useEffect(() => {
    dispatch(getSingleEvent(params.id));
  }, [dispatch, params.id]);

  var event = useSelector((securityReducer) => securityReducer.events.events);

  useEffect(() => {
    if (event) {
      setEventData(event.data);
    }
  }, [event]);

  return (
    <>
      {eventData ? (
        <div style={{ position: "relative" }}>
          <div className="dash-container">
            <div className="content">
              <Container>
                <CommentItem eventData={eventData} />
              </Container>
            </div>

            <div className="sidebar_eventDash">
              <div className="sidebar-wrapper">
                <EventItem eventData={eventData} />
                <ManageMembers
                  eventData={eventData}
                  currentUser={currentUser}
                  img={img}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default EventDash;
