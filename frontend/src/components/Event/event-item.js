import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./join-event";
import UpdateEvent from "./update-event";
import { eventOptions } from "../Utilities/event-options";
import { Mention } from "../Utilities/mention";

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
            <div className="d-flex">
              <img src={img} className="userProf-img me-3" alt="Img" />
              <div className="me-auto">
                <h6 className="fw-bold m-0">{props.eventData.title}</h6>
                <small
                  className="text-muted"
                  style={{ fontSize: "12px", display: "block" }}
                >
                  <a
                    href={`profile?user=${props.eventData.userName}`}
                    className="text-decoration-none"
                  >
                    @{props.eventData.userName}
                  </a>{" "}
                  <strong> {props.eventData.humanTimeDiffCreatedAt} ago</strong>
                </small>
              </div>
              {/* {joined ? (
                <div className="me-2">
                  <Badge bg="success">Joined</Badge>
                </div>
              ) : requested ? (
                <div className="me-2">
                  <Badge bg="primary">Requested</Badge>
                </div>
              ) : rejected ? (
                <div className="me-2">
                  <Badge bg="danger">Unapproved</Badge>
                </div>
              ) : (
                ""
              )} */}

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
                      props.eventCount,
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
            <Card.Text
              className="details_textarea"
              dangerouslySetInnerHTML={{
                __html: props.eventData.details
                  ? Mention(props.eventData.details)
                  : props.eventData.details,
              }}
            />
            <ButtonGroup
              aria-label="Basic example"
              className="mt-3 w-100 gap-2"
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
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                  Likes
                </span>
              </Button>

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
                  Comments
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
