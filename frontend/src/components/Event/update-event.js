import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import {
  updateEvent,
  getSingleEvent,
} from "../../services/actions/eventActions";
import { useDispatch } from "react-redux";
import CTAButton from "../../layouts/cta-button";
import { useParams } from "react-router-dom";
import { emitter } from "../client/socket";
import { MentionFilter } from "../../utilities/utility-service";
import { Cross, Submit } from "../../layouts/icons";

function UpdateEvent(props, { handleUpate }) {
  const dispatch = useDispatch();
  const params = useParams();
  const [title, setTitle] = useState(props.title);
  const [maxMembers, setMaxMembers] = useState(props.maxMembers);
  const [details, setDetails] = useState(props.details);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      maxMember: maxMembers,
      details: details,
    };

    dispatch(updateEvent(props.eventId, postData)).then(() => {
      dispatch(getSingleEvent(params.id));
      emitter(MentionFilter(details));
    });
    props.handleUpate();
  };

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Card className={props.cardStyle}>
        <Card.Header>
          <h3 className="fw-bold m-0">Update event</h3>
        </Card.Header>
        <Card.Body>
          <Form.Group className="d-flex mb-3">
            <Form.Control
              className="me-2"
              type="title"
              placeholder="Event Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <Form.Control
              type="number"
              placeholder="Maximum Members"
              value={maxMembers || ""}
              onChange={(e) => setMaxMembers(parseInt(e.target.value))}
              min="2"
              required
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              spellCheck={true}
              placeholder="What's on your mind?"
              as="textarea"
              value={details || ""}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-between mt-3">
            <CTAButton
              type={""}
              btnStyle={"postBtn-placements"}
              variant={"primary"}
              onClick={props.handleUpate}
              placeholder={
                <div className="d-flex align-items-center">
                  <Cross />
                  Cancel
                </div>
              }
            />
            <CTAButton
              type={"submit"}
              btnStyle={"postBtn-placements cta_button"}
              variant={"primary"}
              formValidation={
                title === "" ||
                maxMembers === "" ||
                details === "" ||
                details === "<p><br></p>"
                  ? true
                  : false
              }
              isLoading={""}
              placeholder={
                <div className="d-flex align-items-center">
                  <Submit />
                  Publish
                </div>
              }
            />
          </div>
        </Card.Body>
      </Card>{" "}
    </Form>
  );
}

export default UpdateEvent;
