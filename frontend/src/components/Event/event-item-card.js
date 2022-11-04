import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./join-event";
import EventMembers from "./event-members";
import RemoveEvent from "./remove-event";
import CTAButton from "../SiteElements/cta-button";
import { RiEditLine } from "react-icons/ri";
import UpdateEvent from "./update-event";
import { eventOptions } from "../Utilities/event-options";
import { Mention } from "../Utilities/mention";

function EventItemCard(props) {
  const [currentUser, setCurrentUser] = useState();
  const [editorMode, setEditorMode] = useState(false);
  const joined = props.eventData.joinedStatus === "ACCEPTED";
  const requested = props.eventData.joinedStatus === "PENDING";
  const rejected = props.eventData.joinedStatus === "REJECTED";

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  function handleClick() {
    setEditorMode(!editorMode);
  }

  return (
    <Card style={{ width: "18rem" }} className="event-card_dash">
      <Card.Header>
        <div className="d-flex">
          <img src={img} className="userProf-img me-2" alt="Img" />
          <div className="me-auto">
            <a
              href={`profile?user=${props.eventData.userName}`}
              className="text-decoration-none"
            >
              @{props.eventData.userName}
            </a>
            <small
              className="text-muted"
              style={{ fontSize: "12px", display: "block" }}
            >
              <strong> {props.eventData.humanTimeDiffCreatedAt} ago</strong>
            </small>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="event-brief">
          <small className="text-muted">
            {props.eventData.eventDateString}
          </small>
          <p className="mt-1">{props.eventData.title}</p>
        </div>

        <small className="text-muted">Party size: 4</small>

        {/*  {currentUser !== props.eventData.user &&
        !joined &&
        !requested &&
        !rejected ? (
          <JoinEvent
            eventId={props.eventData.id}
            eventTitle={props.eventData.title}
          />
        ) : (
          ""
        )} */}

        {/* <EventMembers
            eventId={props.eventData.id}
            userId={props.eventData.user}
            currentUser={currentUser}
          /> */}
        <ButtonGroup className="mt-3 w-100 gap-2 " vertical>
          <Button variant="primary">More Information</Button>
          <Button variant="light">Join Event</Button>
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default EventItemCard;
