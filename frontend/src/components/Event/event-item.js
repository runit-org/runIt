import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Card, Badge } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./join-event";
import EventMembers from "./event-members";
import RemoveEvent from "./remove-event";
import CTAButton from "../SiteElements/cta-button";
import { RiEditLine } from "react-icons/ri";
import UpdateEvent from "./update-event";

function EventItem(props) {
  const [currentUser, setCurrentUser] = useState();
  const [editorMode, setEditorMode] = useState(false);

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
        <Card
          className={currentUser === props.eventData.user ? "event-owned" : ""}
        >
          <Card.Body>
            <Card.Header>
              {" "}
              <Row>
                <Col lg={1}>
                  <img src={img} className="userProf-img" alt="Img"></img>
                </Col>
                <Col md="auto" className="ps-0">
                  <h6 className="fw-bold">{props.eventData.title}</h6>

                  <small
                    className="text-muted"
                    style={{ fontSize: "12px", display: "block" }}
                  >
                    <a href="#" className="text-decoration-none">
                      @{props.eventData.userName}
                    </a>{" "}
                    <strong>
                      {" "}
                      {props.eventData.humanTimeDiffCreatedAt} ago
                    </strong>
                  </small>
                </Col>
                <Col className="text-end d-flex justify-content-end">
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
                  ) : (
                    <JoinEvent
                      eventId={props.eventData.id}
                      eventTitle={props.eventData.title}
                    />
                  )}
                  {/*    {!userAff ? (
                    <JoinEvent
                      eventId={props.eventData.id}
                      eventTitle={props.eventData.title}
                    />
                  ) : currentUser === props.eventData.user ? (
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
                  ) : (
                    ""
                  )} */}
                  {/* {userJoinedEv
                    .map((i) => i.id)
                    .includes(props.eventData.id) ? (
                    <div>
                      <Badge bg="primary">Joined</Badge>
                    </div>
                  ) : (
                    ""
                  )} */}
                  <EventMembers
                    eventId={props.eventData.id}
                    userId={props.eventData.user}
                    currentUser={currentUser}
                  />{" "}
                </Col>
              </Row>
            </Card.Header>

            <Card.Text
              dangerouslySetInnerHTML={{ __html: props.eventData.details }}
            />
          </Card.Body>
        </Card>
      ) : (
        <UpdateEvent
          eventId={props.eventData.id}
          title={props.eventData.title}
          details={props.eventData.details}
          maxMembers={props.eventData.maxMember}
          cardStyle={currentUser === props.eventData.user ? "event-owned" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default EventItem;
