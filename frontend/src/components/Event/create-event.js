import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent, getAllEvents } from "../../actions/eventActions";
import { emitter } from "../client/socket";
import CTAButton from "../SiteElements/cta-button";
import { SearchParam } from "../Utilities/search-param";

function CreateEvent() {
  const dispatch = useDispatch();
  const formRef = useRef(0);
  const [title, setTitle] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [details, setDetails] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [error, setError] = useState("");

  const eventDate = new Date(date);

  let pageId = SearchParam();

  useEffect(() => {
    if (details === "" || details === "<p><br></p>") {
      setValidateFormEmpty(true);
    } else {
      setValidateFormEmpty(false);
    }
  }, [details]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      maxMember: maxMembers,
      details: details,
      year: eventDate.getFullYear(),
      month: eventDate.getMonth() + 1,
      day: eventDate.getDate(),
      hour: time !== "" ? parseInt(time.split(":")[0]) : "",
      minute: time !== "" ? parseInt(time.split(":")[1]) : "",
    };
    dispatch(createNewEvent(postData, setLoad, setError)).then(() => {
      dispatch(getAllEvents(pageId));
      emitter(details);
    });
  };

  useEffect(() => {
    if (error === 200) {
      formRef.current.reset();
      setDetails("");
      setError("");
    }
  }, [error]);

  return (
    <Card className="event-card">
      <Card.Header>
        <h3 className="fw-bold m-0">Create event</h3>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          ref={formRef}
        >
          <div className="new-post-container">
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted p-1">
                    Event Title
                  </Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Event Title"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted p-1">Size</Form.Label>

                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="Maximum Members"
                    onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                    min="2"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted  p-1">Time</Form.Label>

                  <Form.Control
                    type="time"
                    placeholder="Time"
                    onChange={(e) => setTime(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="text-muted p-1">Date</Form.Label>

                  <Form.Control
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Control
                placeholder="What's on your mind?"
                as="textarea"
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                required
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <small className="text-danger">{error}</small>
            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button"}
              variant={"primary"}
              formValidation={validateFormEmpty}
              isLoading={load}
              placeholder={
                <div className="d-flex align-items-center">
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
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
                  Publish
                </div>
              }
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateEvent;
