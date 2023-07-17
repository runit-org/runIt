import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createNewEvent,
  getAllEvents,
} from "../../services/actions/eventActions";
import { emitter } from "../client/socket";
import CTAButton from "../../layouts/cta-button";
import { MentionFilter } from "../../utilities/utility-service";
import { usePageId } from "../../hooks/usePageId";
import * as ResponseStatus from "../../services/constants/response-status";

function CreateEvent(props) {
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

  let pageId = usePageId();

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
    if (error === ResponseStatus.OK) {
      formRef.current.reset();
      setTitle("");
      setDate("");
      setTime("");
      setDetails("");
      setError("");
    }
  }, [error]);

  //data from suggestions
  useEffect(() => {
    if (Object.keys(props.suggestion).length !== 0) {
      setTitle(`${props.suggestion.title} - ${props.suggestion.category}`);
      setDetails(
        `Location: ${props.suggestion.location} \nLink: ${props.suggestion.link}\n\n`
      );
      setDate(new Date(props.suggestion.time).toISOString().split("T")[0]);
      setTime(
        new Date(props.suggestion.time).toLocaleTimeString("en-US", {
          timeStyle: "short",
          hour12: false,
        })
      );
    }
  }, [props.suggestion]);

  return (
    <Card className="create_event-card">
      <Card.Header>
        <p className="fw-bold m-0">Create event</p>
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
                    placeholder=""
                    value={title}
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
                    placeholder=""
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
                    value={time}
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
                    value={date}
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
                placeholder="Write event details..."
                as="textarea"
                value={details}
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
                <div className="d-flex align-items-center">Post</div>
              }
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateEvent;
