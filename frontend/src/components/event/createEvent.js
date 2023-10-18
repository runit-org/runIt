import React, { useState, useEffect, useRef } from "react";
import { Row, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../services/actions/eventActions";
import { emitter } from "../client/socket";
import CTAButton from "../../layouts/ctaButton";
import { MentionFilter } from "../../utilities/utility-service";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { useHandleChange } from "../../hooks/useHandleChange";
import { FormGroup, FormLabel } from "../../layouts/customForm";
import { ResponseItem } from "../../layouts/responseItems";
import { useNavigate } from "react-router-dom";
import { RESET_CURRENT_PAGE } from "../../services/constants/types";
import { EVENT } from "../../routes/routes";

function CreateEvent(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
  const [load, setLoad] = useState(false);
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
    dispatch(createNewEvent(postData, setLoad)).then(({ status, data }) => {
      if (status === ResponseStatus.OK) {
        formRef.current.reset();
        setFormValue(initialState);
        emitter(MentionFilter(data.data.details));
        dispatch({
          type: RESET_CURRENT_PAGE,
        });
        navigate(`/${EVENT}/${data.data.id}?page=1`);
      }
    });
  };

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
        maxMember: formValue.maxMember,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <FormGroup formId="formBasicTitle">
              <FormLabel>Event Title</FormLabel>
              <Form.Control
                type="title"
                name="title"
                value={formValue.title}
                onChange={handleFieldChange}
                required
              />
            </FormGroup>

            <Row>
              <FormGroup formId="formBasicNumber" customStyle="col-md-4">
                <FormLabel>Size</FormLabel>
                <Form.Control
                  type="number"
                  name="maxMember"
                  className="mb-3"
                  onChange={handleFieldChange}
                  min="2"
                  required
                />
              </FormGroup>

              <FormGroup formId="formBasicTime" customStyle="col-md-4">
                <FormLabel>Time</FormLabel>

                <Form.Control
                  type="time"
                  placeholder="Time"
                  name="time"
                  value={formValue.time}
                  onChange={handleFieldChange}
                  required
                />
              </FormGroup>

              <FormGroup formId="formBasicDate" customStyle="col-md-4">
                <FormLabel>Date</FormLabel>

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
              </FormGroup>
            </Row>

            <FormGroup formId="formBasicDetails">
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
            </FormGroup>
          </div>

          <div className="d-flex justify-content-between mt-3">
            <ResponseItem />
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
