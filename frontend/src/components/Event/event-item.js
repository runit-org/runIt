import React, { useState, useContext } from "react";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import UpdateEvent from "./update-event";
import { eventOptions } from "./utilities/event-options";
import { Mention } from "../Utilities/mention";
import EventMembers from "./event-members";
import { RequestBtn, StatusBadge } from "./utilities/event-builder";
import { SingleEventContext } from "../Dashboards/event-dash";
import { SecurityContext } from "../Context/security-context";
import { Comment, Ellipse } from "../SiteElements/icons";

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
              <img
                src={eventData.gravatarImage}
                className="userProf-img me-3"
                alt="Img"
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
                    ).options_owner.map((i, index) => {
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
                dangerouslySetInnerHTML={{
                  __html: eventData.details
                    ? Mention(eventData.details)
                    : eventData.details,
                }}
              />
            </div>
            <div className="details_textarea">
              <h6>Details</h6>
              <small className="text-muted">
                Host:{" "}
                <a
                  href={`/profile?user=${eventData.userName}`}
                  className="text-decoration-none"
                >
                  @{eventData.userName}
                </a>
              </small>
              <br />
              <small className="text-muted">
                Posted: {eventData.humanTimeDiffCreatedAt} ago
              </small>
              <br />
              <small className="text-muted">
                Date: {eventData.eventDateString}{" "}
              </small>

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
