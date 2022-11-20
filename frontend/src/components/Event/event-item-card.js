import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge, Button, ButtonGroup, Card } from "react-bootstrap";
import JoinEvent from "./join-event";
import { useNavigate } from "react-router-dom";
import PopoverItem from "../Profile/popover-item";

function EventItemCard(props) {
  const [currentUser, setCurrentUser] = useState();
  const navigate = useNavigate();

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
          <img
            src={props.eventData.gravatarImage}
            className="userProf-img me-2"
            alt="Img"
          />
          <div className="me-auto">
            <PopoverItem data={props.eventData.userName} />

            <small
              className="text-muted"
              style={{ fontSize: "12px", display: "block" }}
            >
              <strong> {props.eventData.humanTimeDiffCreatedAt} ago</strong>
            </small>
          </div>
          {joined ? (
            <div>
              <Badge
                bg=""
                style={{ backgroundColor: "#DFF2BF", color: "#4F8A10" }}
              >
                Joined
              </Badge>
            </div>
          ) : requested ? (
            <div>
              <Badge
                bg=""
                style={{ backgroundColor: "#e5edff", color: "#5850ec" }}
              >
                Requested
              </Badge>
            </div>
          ) : rejected ? (
            <div>
              <Badge
                bg=""
                style={{ backgroundColor: "#FFD2D2", color: "#D8000C" }}
              >
                Unapproved
              </Badge>
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

        <ButtonGroup className="mt-3 w-100 gap-2" vertical>
          <Button
            variant="primary"
            onClick={() => navigate(`/event/${props.eventData.id}`)}
          >
            More Information
          </Button>
          {currentUser !== props.eventData.user &&
          !joined &&
          !requested &&
          !rejected ? (
            <JoinEvent
              eventId={props.eventData.id}
              eventTitle={props.eventData.title}
              btnStyleFull={true}
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
