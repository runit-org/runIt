import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import PopoverItem from "../Profile/popover-item";
import { ArrowRight } from "../SiteElements/icons";
import { BadgeItem, RequestBtn, StatusBadge } from "./utilities/event-builder";

function EventItemCard(props) {
  return (
    <>
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
            <RequestBtn
              JoinEvent={props.eventData}
              joinedStatus={props.eventData.joinedStatus}
              btnStyleFull={false}
            />
          </div>
        </Card.Header>
        <Card.Body>
          <div className="event-brief mt-1">
            <h4>{props.eventData.title} </h4>
          </div>

          <div className="mt-2">
            <p className="text-muted content_sm1">{props.eventData.details}</p>
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
            More <ArrowRight />
          </Link>
        </Card.Footer>
      </Card>
    </>
  );
}

export default EventItemCard;
