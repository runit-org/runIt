import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import PopoverItem from "../../layouts/popoverItem";
import { ArrowRight } from "../../layouts/icons";
import { BadgeItem, RequestBtn, StatusBadge } from "./helper/eventBuilder";
import { DisplayImage } from "../../layouts/user/userDisplayImg";
import { Username } from "../../layouts/user/username";
import { VerifiedRender } from "../../routes/verifiedRender";
import { EVENT } from "../../routes/routes";

function EventItemCard(props) {
  return (
    <div className="event-card_dash">
      <div className="d-flex" id="card_header">
        <PopoverItem id={"profile-popover"} data={props.eventData.userName}>
          <DisplayImage
            image={props.eventData.gravatarImage}
            imgClass="me-2 cursor-event"
            id="card-img"
          />
        </PopoverItem>

        <Username username={props.eventData.userName} size={"sm"} />

        <div className="me-auto">
          <span className="card-timestamp text-muted align-self-center">
            {props.eventData.humanTimeDiffCreatedAt} ago
          </span>
        </div>

        <StatusBadge eventData={props.eventData} />
        <VerifiedRender>
          <RequestBtn eventData={props.eventData} btnStyleFull={false} />
        </VerifiedRender>
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

          <BadgeItem
            content={props.eventData.timeToEvent}
            eventStatus={props.eventData.eventStatus}
          />
        </Card.Body>
        <Card.Footer>
          <Link to={`/${EVENT}/${props.eventData.id}`}>
            Details <ArrowRight />
          </Link>
        </Card.Footer>
      </Card>
    </div>
  );
}

export default EventItemCard;
