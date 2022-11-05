import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge, Button, ButtonGroup, Card } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./join-event";

function EventItemCard(props) {
  const [currentUser, setCurrentUser] = useState();

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

  return (
    <Card className="event-card_dash">
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
          {joined ? (
            <div>
              <Badge bg="success">Joined</Badge>
            </div>
          ) : requested ? (
            <div>
              <Badge bg="primary">Requested</Badge>
            </div>
          ) : rejected ? (
            <div>
              <Badge bg="danger">Unapproved</Badge>
            </div>
          ) : (
            ""
          )}
        </div>
      </Card.Header>
      <Card.Body>
        <div className="event-brief">
          <small className="text-muted">
            {props.eventData.eventDateString}
          </small>
          <p className="mt-1">{props.eventData.title}</p>
        </div>

        <small className="text-muted ">Party size: 4</small>

        {/* <EventMembers
            eventId={props.eventData.id}
            userId={props.eventData.user}
            currentUser={currentUser}
          /> */}
        <ButtonGroup className="mt-3 w-100 gap-2" vertical>
          <Button variant="primary">More Information</Button>
          {currentUser !== props.eventData.user &&
          !joined &&
          !requested &&
          !rejected ? (
            <JoinEvent
              eventId={props.eventData.id}
              eventTitle={props.eventData.title}
            />
          ) : (
            ""
          )}
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default EventItemCard;
