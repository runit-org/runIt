import React from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PopoverItem from "../Profile/popover-item";
import { BadgeItem, RequestBtn, StatusBadge } from "./utilities/event-builder";

function EventItemCard(props) {
  const navigate = useNavigate();

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

          <StatusBadge joinedStatus={props.eventData.joinedStatus} />
        </div>
      </Card.Header>
      <Card.Body>
        <BadgeItem
          content={props.eventData.timeToEvent}
          eventStatus={props.eventData.eventStatus}
        />

        <div className="event-brief">
          <small className="text-muted">
            {props.eventData.eventDateString}
          </small>
          <p className="mt-1">{props.eventData.title}</p>
        </div>

        <small className="text-muted ">
          Accepting: {props.eventData.maxMember} members
        </small>

        <ButtonGroup className="mt-3 w-100 gap-2" vertical>
          <Button
            variant="primary"
            onClick={() => navigate(`/event/${props.eventData.id}`)}
          >
            More Information
          </Button>
          <RequestBtn
            JoinEvent={props.eventData}
            joinedStatus={props.eventData.joinedStatus}
            btnStyleFull={true}
          />
        </ButtonGroup>
      </Card.Body>
    </Card>
  );
}

export default EventItemCard;
