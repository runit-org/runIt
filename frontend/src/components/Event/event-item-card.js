import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PopoverItem from "../Profile/popover-item";
import { ArrowRight } from "../SiteElements/icons";
import { BadgeItem, RequestBtn, StatusBadge } from "./utilities/event-builder";

function EventItemCard(props) {
  return (
    <div className="event-card_dash">
      <div className="d-flex" id="card_header">
        <img
          src={props.eventData.gravatarImage}
          className="userProf-img me-2"
          id="card-img"
          alt="Img"
        />
        <PopoverItem data={props.eventData.userName} />

        <div className="me-auto">
          <span className="card-timestamp text-muted align-self-center ms-1">
            {props.eventData.humanTimeDiffCreatedAt} ago
          </span>
        </div>

        <StatusBadge joinedStatus={props.eventData.joinedStatus} />
        <RequestBtn
          JoinEvent={props.eventData}
          joinedStatus={props.eventData.joinedStatus}
          btnStyleFull={false}
        />
      </div>

      <Card>
        <Card.Body>
          <div className="event-brief mt-1">
            <h4>{props.eventData.title} </h4>
          </div>

          <div className="mt-2">
            <p
              className="text-muted content_sm1"
              dangerouslySetInnerHTML={{ __html: props.eventData.details }}
            />
          </div>

          <div>
            <BadgeItem
              content={props.eventData.timeToEvent}
              eventStatus={props.eventData.eventStatus}
            />
          </div>
        </Card.Body>
        <Card.Footer>
          <Link to={`/event/${props.eventData.id}`}>
            Details <ArrowRight />
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default EventItemCard;
