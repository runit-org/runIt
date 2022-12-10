import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent, getAllEvents } from "../../actions/eventActions";
import { emitter } from "../client/socket";
import CTAButton from "../SiteElements/cta-button";
import { Submit } from "../SiteElements/icons";
import { MentionFilter } from "../Utilities/mention";
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
      emitter(MentionFilter(details));
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
                  <Form.Label className="m-1">Event Title</Form.Label>
                  <Form.Control
                    type="title"
                    placeholder="Christmas social"
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="m-1">Size</Form.Label>
                  <Form.Control
                    type="number"
                    className="mb-3"
                    placeholder="14"
                    onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                    min="2"
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label className="m-1">Time</Form.Label>

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
                  <Form.Label className="m-1">Date</Form.Label>

                  <Form.Control
                    type="date"
                    placeholder="Date"
                    onChange={(e) => setDate(e.target.value)}
                    min={
                      new Date(
                        Date.now() - new Date().getTimezoneOffset() * 60000
                      )
                        .toISOString()
                        .split("T")[0]
                    }
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Control
                spellCheck={true}
                placeholder="Event details..."
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
                  <Submit />
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
