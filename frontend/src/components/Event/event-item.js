import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Badge, Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import JoinEvent from "./join-event";
import UpdateEvent from "./update-event";
import { eventOptions } from "../Utilities/event-options";
import { Mention } from "../Utilities/mention";
import EventMembers from "./event-members";

function EventItem(props) {
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
    <>
      {editorMode === false ? (
        <Card className="event-card">
          <Card.Header>
            <div className="d-flex justify-content-between">
              <img
                src={props.eventData.gravatarImage}
                className="userProf-img me-3"
                alt="Img"
              />
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
              {currentUser === props.eventData.user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    id="dropdown-basic"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width="24"
                      height="24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {eventOptions(
                      props.eventData.id,
                      props.eventData.title,
                      props.eventData.user,
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
              <h4>{props.eventData.title}</h4>
              <span
                dangerouslySetInnerHTML={{
                  __html: props.eventData.details
                    ? Mention(props.eventData.details)
                    : props.eventData.details,
                }}
              />
            </div>
            <div className="details_textarea">
              <h6>Details</h6>
              <small className="text-muted">
                Host:{" "}
                <a
                  href={`/profile?user=${props.eventData.userName}`}
                  className="text-decoration-none"
                >
                  @{props.eventData.userName}
                </a>
              </small>
              <br />
              <small className="text-muted">
                Posted: {props.eventData.humanTimeDiffCreatedAt} ago
              </small>
              <br />
              <small className="text-muted">
                Date: {props.eventData.eventDateString}{" "}
              </small>

              <div className="mt-4">
                <EventMembers
                  eventId={props.eventData.id}
                  userId={props.eventData.user}
                  currentUser={currentUser}
                  img={props.eventData.gravatarImage}
                />
              </div>
            </div>
            <ButtonGroup
              aria-label="Basic example"
              className="mt-3 w-100 justify-content-between"
            >
              <Button variant="light" className="postBtn-placements cta_button">
                <span className="d-flex align-items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                    className="me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.068.157 2.148.279 3.238.364.466.037.893.281 1.153.671L12 21l2.652-3.978c.26-.39.687-.634 1.153-.67 1.09-.086 2.17-.208 3.238-.365 1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    />
                  </svg>
                  {props.commentCount}
                </span>
              </Button>
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
      ) : (
        <UpdateEvent
          eventId={props.eventData.id}
          title={props.eventData.title}
          details={props.eventData.details}
          maxMembers={props.eventData.maxMember}
          cardStyle={currentUser === props.eventData.user ? "editor-card" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default EventItem;
