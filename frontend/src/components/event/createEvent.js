import React, { useState, useEffect, useRef } from "react";
import { Col, Row, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createNewEvent,
  getAllEvents,
} from "../../services/actions/eventActions";
import { emitter } from "../client/socket";
import CTAButton from "../../layouts/ctaButton";
import { MentionFilter } from "../../utilities/utility-service";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { useHandleChange } from "../../hooks/useHandleChange";

function CreateEvent(props) {
  const dispatch = useDispatch();
  const formRef = useRef(0);

  const initialState = {
    title: "",
    maxMember: 0,
    details: "",
    date: "",
    time: "",
  };

  const { formValue, setFormValue, handleFieldChange } =
    useHandleChange(initialState);

  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [formStatus, setFormStatus] = useState({
    load: false,
    error: "",
  });

  const eventDate = new Date(formValue.date);

  useEffect(() => {
    if (!/\S/.test(formValue.details)) {
      setValidateFormEmpty(true);
    } else {
      setValidateFormEmpty(false);
    }
  }, [formValue.details]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formValue,
      year: eventDate.getFullYear(),
      month: eventDate.getMonth() + 1,
      day: eventDate.getDate(),
      hour: formValue.time !== "" ? parseInt(formValue.time.split(":")[0]) : "",
      minute:
        formValue.time !== "" ? parseInt(formValue.time.split(":")[1]) : "",
    };
    dispatch(createNewEvent(postData, setFormStatus)).then(() => {
      dispatch(getAllEvents(1));
      emitter(MentionFilter(formValue.details));
    });
  };

  useEffect(() => {
    if (formStatus.error === ResponseStatus.OK) {
      formRef.current.reset();
      setFormValue(initialState);
      setFormStatus({ error: "" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formStatus.error]);

  //data from suggestions
  useEffect(() => {
    if (Object.keys(props.suggestion).length !== 0) {
      setFormValue({
        title: `${props.suggestion.title} - ${props.suggestion.category}`,
        details: `Location: ${props.suggestion.location} \nLink: ${props.suggestion.link}\n\n`,
        date: new Date(props.suggestion.time).toISOString().split("T")[0],
        time: new Date(props.suggestion.time).toLocaleTimeString("en-US", {
          timeStyle: "short",
          hour12: false,
        }),
      });
    }
  }, [props.suggestion, setFormValue]);

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
                    name="title"
                    value={formValue.title}
                    onChange={handleFieldChange}
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
                    name="maxMember"
                    className="mb-3"
                    onChange={handleFieldChange}
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
                    name="time"
                    value={formValue.time}
                    onChange={handleFieldChange}
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
                    name="date"
                    value={formValue.date}
                    onChange={handleFieldChange}
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
                name="details"
                placeholder="Write event details..."
                as="textarea"
                value={formValue.details}
                onChange={handleFieldChange}
                rows={4}
                required
              />
            </Form.Group>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <small className="text-danger">{formStatus.error}</small>
            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button"}
              variant={"primary"}
              formValidation={validateFormEmpty}
              isLoading={formStatus.load}
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
