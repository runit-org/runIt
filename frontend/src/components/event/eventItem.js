import React, { useState, useContext } from "react";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import UpdateEvent from "./updateEvent";
import { eventOptions } from "./utilities/eventOptions";
import { Mention } from "../../utilities/utility-service";
import EventMembers from "./eventMembers";
import { RequestBtn, StatusBadge } from "./utilities/eventBuilder";
import { SingleEventContext } from "../../pages/singleEventDash";
import { SecurityContext } from "../../context/securityProvider";
import { Comment, Ellipse } from "../../layouts/icons";
import { CANCELLED, FINISHED } from "./utilities/eventTypes";
import { DisplayImage } from "../../layouts/userDisplayImg";

function EventItem(props) {
  const [editorMode, setEditorMode] = useState(false);
  const eventData = useContext(SingleEventContext);
  const currentUser = useContext(SecurityContext);

  function handleClick() {
    setEditorMode(!editorMode);
  }

  return (
    <>
      {editorMode === false ? (
        <Card className="event-card">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <DisplayImage
                image={eventData.gravatarImage}
                imgClass="userProf-img me-3"
              />
              <StatusBadge joinedStatus={eventData.joinedStatus} />
              {currentUser === eventData.user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    id="dropdown-basic"
                  >
                    <Ellipse />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {eventOptions(
                      eventData.id,
                      eventData.title,
                      eventData.user,
                      currentUser,
                      handleClick
                    )
                      .options_owner.slice(
                        eventData.eventStatus === CANCELLED ||
                          eventData.eventStatus === FINISHED
                          ? (0, 2)
                          : ""
                      )
                      .map((i, index) => {
                        return (
                          <div key={index} className="p-1">
                            {i.item}
                          </div>
                        );
                      })}
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                ""
              )}
            </div>
          </Card.Header>
          <Card.Body>
            <div className="details_textarea">
              <h4>{eventData.title}</h4>
              <span
                className="content_sm1"
                dangerouslySetInnerHTML={{
                  __html: eventData.details
                    ? Mention(eventData.details)
                    : eventData.details,
                }}
              />
            </div>
            <div className="details_textarea">
              <div className="d-flex flex-column gap-1">
                <h6>Details</h6>
                <small className="text-muted">
                  Host:{" "}
                  <a href={`/profile?user=${eventData.userName}`}>
                    @{eventData.userName}
                  </a>
                </small>

                <small className="text-muted">
                  Posted: {eventData.humanTimeDiffCreatedAt} ago
                </small>

                <small className="text-muted">
                  Date: {eventData.eventDateString}{" "}
                </small>

                <small className="text-muted">
                  Audience Size: {eventData.maxMember}{" "}
                </small>
              </div>

              <div className="mt-4">
                <EventMembers
                  eventId={eventData.id}
                  userId={eventData.user}
                  currentUser={currentUser}
                  img={eventData.gravatarImage}
                />
              </div>
            </div>
            <ButtonGroup
              aria-label="Basic example"
              className="mt-3 w-100 justify-content-between"
            >
              <Button variant="light" className="postBtn-placements cta_button">
                <span className="d-flex align-items-center fw-normal small text-muted">
                  <Comment />
                  {props.commentCount}
                </span>
              </Button>
              <RequestBtn
                JoinEvent={eventData}
                joinedStatus={eventData.joinedStatus}
              />
            </ButtonGroup>
          </Card.Body>
        </Card>
      ) : (
        <UpdateEvent
          eventId={eventData.id}
          title={eventData.title}
          details={eventData.details}
          maxMembers={eventData.maxMember}
          cardStyle={currentUser === eventData.user ? "editor-card" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default EventItem;
