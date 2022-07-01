import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Card, Button } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./JoinEvent";

function EventItem(props) {
  const [currentUser, setCurrentUser] = useState();

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );
  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  return (
    <div>
      {/* <Row className="row justify-content-center">Event Data</Row> */}
      <Card>
        <Card.Body>
          <Card.Header>
            {" "}
            <Row xs="auto">
              <Col>
                <img src={img} className="userProf-img"></img>
              </Col>
              <Col>
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
            </Row>
          </Card.Header>

          <Card.Text
            className="mt-4"
            dangerouslySetInnerHTML={{ __html: props.eventDetails }}
          />
        </Card.Body>
        <footer className="p-2">
          {currentUser != null && currentUser != props.userId ? (
            <JoinEvent eventId={props.eventId} eventTitle={props.eventTitle} />
          ) : (
            ""
          )}
        </footer>
      </Card>
      <hr />
    </div>
  );
}

export default EventItem;
