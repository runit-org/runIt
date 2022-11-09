import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { updateEvent, getSingleEvent } from "../../actions/eventActions";
import { useDispatch } from "react-redux";
import CTAButton from "../SiteElements/cta-button";
import { useParams } from "react-router-dom";

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
      // dispatch(getAllEvents(pageId));
      dispatch(getSingleEvent(params.id));
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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
        </Card.Body>
      </Card>{" "}
    </Form>
  );
}

export default UpdateEvent;
