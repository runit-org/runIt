import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Card  } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./join-event";
import EventMembers from "./event-members";
import RemoveEvent from "./remove-event";
import CTAButton from "../SiteElements/cta-button";
import { RiEditLine } from "react-icons/ri";
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
              <img src={img} className="userProf-img me-2" alt="Img" />
              <div className="me-auto">
                <h6 className="fw-bold m-0">{props.eventData.title}</h6>
                <small
                  className="text-muted"
                  style={{ fontSize: "12px", display: "block" }}
                >
                  <a href="#" className="text-decoration-none">
                    @{props.eventData.userName}
                  </a>{" "}
                  <strong> {props.eventData.humanTimeDiffCreatedAt} ago</strong>
                </small>
              </div>
              {/*  {joined ? (
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
              {/* <Dropdown>
                <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={"22px"}
                    height={"22px"}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    stroke-width="2"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </Dropdown.Toggle>
                {currentUser === props.eventData.user ? (
                  <Dropdown.Menu>
                    {eventOptions(
                      props.eventData.id,
                      props.eventData.title,
                      props.eventCount,
                      props.eventData.user,
                      currentUser,
                      handleClick
                    ).options_owner.map((i, index) => {
                      return <div key={index}>{i.item}</div>;
                    })}
                  </Dropdown.Menu>
                ) : (
                  <Dropdown.Menu>
                    {eventOptions(
                      props.eventData.id,
                      props.eventData.title,
                      props.eventData.user,
                      currentUser
                    ).options_user.map((i, index) => {
                      return <div key={index}>{i.item}</div>;
                    })}
                  </Dropdown.Menu>
                )}
              </Dropdown> */}
              {currentUser === props.eventData.user ? (
                <>
                  <RemoveEvent
                    eventId={props.eventData.id}
                    eventTitle={props.eventData.title}
                    eventCounts={props.eventCount}
                  />
                  <div>
                    <CTAButton
                      type={""}
                      btnStyle={"postBtn-placements"}
                      variant={"primary"}
                      onClick={handleClick}
                      placeholder={<RiEditLine />}
                    />
                  </div>
                </>
              ) : !joined && !requested && !rejected ? (
                <JoinEvent
                  eventId={props.eventData.id}
                  eventTitle={props.eventData.title}
                />
              ) : (
                ""
              )}
              <EventMembers
                eventId={props.eventData.id}
                userId={props.eventData.user}
                currentUser={currentUser}
              />{" "}
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Text
            className="details_textarea"
            dangerouslySetInnerHTML={{__html: Mention(props.eventData.details)}}
            /*   dangerouslySetInnerHTML={{ __html: props.eventData.details }} */
              
            />
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
