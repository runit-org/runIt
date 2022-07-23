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

  var userAff = props.eventAffiliated.map((i) => i.id).includes(props.eventId);

  var userJoinedEv = props.eventAffiliated.filter((obj) => {
    return obj.id === props.eventId && obj.user !== currentUser;
  });

  return (
    <>
      {editorMode === false ? (
        <Card className={currentUser === props.userId ? "event-owned" : ""}>
          <Card.Body>
            <Card.Header>
              {" "}
              <Row>
                <Col lg={1}>
                  <img src={img} className="userProf-img" alt="Img"></img>
                </Col>
                <Col md="auto">
                  <h6 className="fw-bold">{props.eventTitle}</h6>

                  <small
                    className="text-muted"
                    style={{ fontSize: "12px", display: "block" }}
                  >
                    <a href="#" className="text-decoration-none">
                      @{props.postedBy}
                    </a>{" "}
                    <strong> {props.createdTime} ago</strong>
                  </small>
                </Col>
                <Col className="text-end d-flex justify-content-end">
                  {!userAff /*  currentUser != props.userId */ ? (
                    <JoinEvent
                      eventId={props.eventId}
                      eventTitle={props.eventTitle}
                    />
                  ) : currentUser == props.userId ? (
                    <>
                      <RemoveEvent
                        eventId={props.eventId}
                        eventTitle={props.eventTitle}
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
                  )}
                  {userJoinedEv.map((i) => i.id).includes(props.eventId) ? (
                    <div>
                      <Badge bg="primary">Joined</Badge>
                    </div>
                  ) : (
                    ""
                  )}
                  <EventMembers
                    eventId={props.eventId}
                    userId={props.userId}
                    currentUser={currentUser}
                  />{" "}
                </Col>
              </Row>
            </Card.Header>

            <Card.Text
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: props.eventDetails }}
            />
          </Card.Body>
        </Card>
      ) : (
        <UpdateEvent
          eventId={props.eventId}
          title={props.eventTitle}
          details={props.eventDetails}
          maxMembers={props.maxMembers}
          cardStyle={currentUser === props.userId ? "event-owned" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default EventItem;
