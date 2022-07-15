import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Card, Button, Form, FloatingLabel } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./JoinEvent";
import EventMembers from "./EventMembers";
import RemoveEvent from "./RemoveEvent";
import ReactQuill from "react-quill";
import { updateEvent } from "../../actions/eventActions";
import { useDispatch } from "react-redux";


function EventItem(props) {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [editorMode, setEditorMode] = useState(false);
  const [title, setTitle] = useState({});
  const [maxMembers, setMaxMembers] = useState({});
  const [details, setDetails] = useState("");


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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      maxMember: maxMembers,
      details: details,
    };
    dispatch(updateEvent(props.eventId, postData));
  };


  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Card className={currentUser == props.userId ? "event-owned" : ""}>
        <Card.Body>
          <Card.Header>
            {" "}
            <Row>
              <Col lg={1}>
                <img src={img} className="userProf-img" alt="Img"></img>
              </Col>
              <Col md="auto">
                {editorMode == false ? (
                  <h6 className="fw-bold">{props.eventTitle}</h6>
                ) : (
                  <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Event Title"
                    className="mb-3"
                  >
                    <Form.Control
                      type="title"
                      placeholder="Event Title"
                      onChange={(e) => setTitle(e.target.value)}
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                )}

                {editorMode == false ? (
                  <small
                    className="text-muted"
                    style={{ fontSize: "12px", display: "block" }}
                  >
                    <a href="#" className="text-decoration-none">
                      @{props.postedBy}
                    </a>{" "}
                    <strong> {props.createdTime} ago</strong>
                  </small>
                ) : (
                  <Form.Group className="mb-3">
                  <FloatingLabel
                    controlId="floatingInput2"
                    label="Maximum Members"
                    className="mb-3"
                  >
                    <Form.Control
                      type="number"
                      placeholder="Maximum Members"
                      onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                      min="2"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
                )}
              </Col>
              <Col className="text-end d-flex justify-content-end">
                {currentUser != null && currentUser != props.userId ? (
                  <JoinEvent
                    eventId={props.eventId}
                    eventTitle={props.eventTitle}
                  />
                ) : currentUser == props.userId ? (
                  <RemoveEvent
                    eventId={props.eventId}
                    eventTitle={props.eventTitle}
                  />
                ) : (
                  ""
                )}
                <EventMembers
                  eventId={props.eventId}
                  userId={props.userId}
                  currentUser={currentUser}
                />{" "}
                <div>
                  <Button onClick={handleClick}>
                    {editorMode == false ? "Edit" : "Cancel"}
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Header>

          {editorMode == false ? (
            <Card.Text
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: props.eventDetails }}
            />
          ) : (
            <><ReactQuill theme="snow" value={details} onChange={setDetails} /> <Button
            type="submit"
            className="mt-3"
          >
           Submit
          </Button></>
          )}
        </Card.Body>
       
        {/*  <footer className="p-2 d-flex">
          {currentUser != null && currentUser != props.userId ? (
            <JoinEvent eventId={props.eventId} eventTitle={props.eventTitle} />
          ) : (
            ""
          )}
           <EventMembers eventId={props.eventId} userId={props.userId} currentUser={currentUser}/>
        </footer> */}
      </Card>
      {/* <hr /> */}
      {/* <Row className="row justify-content-center">Event Data</Row> */}
    </Form>
  );
}

export default EventItem;
