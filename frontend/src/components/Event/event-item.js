import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Col, Row, Card, Form, FloatingLabel, Badge } from "react-bootstrap";
import img from "../../logo192.png";
import JoinEvent from "./join-event";
import EventMembers from "./event-members";
import RemoveEvent from "./remove-event";
import ReactQuill from "react-quill";
import { updateEvent } from "../../actions/eventActions";
import { useDispatch } from "react-redux";
import CTAButton from "../SiteElements/cta-button";
import { RiEditLine, RiCloseFill, RiSendPlaneLine } from "react-icons/ri";
import { QuillFormatting } from "../SiteElements/quill-format";

function EventItem(props) {
  const dispatch = useDispatch();
  const [currentUser, setCurrentUser] = useState();
  const [editorMode, setEditorMode] = useState(false);
  const [title, setTitle] = useState({});
  const [maxMembers, setMaxMembers] = useState({});
  const [details, setDetails] = useState("");
  var quillSetting = QuillFormatting();

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

  var userAff = props.eventAffiliated.map((i) => i.id).includes(props.eventId);

  var userJoinedEv = props.eventAffiliated.filter((obj) => {
    return obj.id === props.eventId && obj.user !== currentUser;
  });

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Card className={currentUser === props.userId ? "event-owned" : ""}>
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
                  <Form.Group className="mb d-inline-flex">
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

                    <FloatingLabel
                      controlId="floatingInput2"
                      label="Maximum Members"
                      className="mb-3"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Maximum Members"
                        onChange={(e) =>
                          setMaxMembers(parseInt(e.target.value))
                        }
                        min="2"
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
                  ""
                )}
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
                        placeholder={
                          editorMode == false ? <RiEditLine /> : <RiCloseFill />
                        }
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

          {editorMode == false ? (
            <Card.Text
              className="mt-4"
              dangerouslySetInnerHTML={{ __html: props.eventDetails }}
            />
          ) : (
            <>
              <ReactQuill
                modules={quillSetting[1]}
                formats={quillSetting[0]}
                theme="snow"
                value={details}
                onChange={setDetails}
              />
              <div className="d-flex justify-content-end">
                <CTAButton
                  type={"submit"}
                  btnStyle={"btn-placements"}
                  variant={"primary"}
                  formValidation={""}
                  isLoading={""}
                  placeholder={<RiSendPlaneLine />}
                />
              </div>
            </>
          )}
        </Card.Body>
      </Card>
    </Form>
  );
}

export default EventItem;
