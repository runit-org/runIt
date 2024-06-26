import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import {
  updateEvent,
  getSingleEvent,
} from "../../services/actions/eventActions";
import { useDispatch } from "react-redux";
import CTAButton from "../../layouts/ctaButton";
import { useParams } from "react-router-dom";
import { emitter } from "../client/socket";
import { MentionFilter } from "../../utilities/utility-service";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { FormLabel } from "../../layouts/customForm";
import ReactQuill from "react-quill";
import { QuillSetting } from "../../utilities/quillSettings";

function UpdateEvent(props) {
  const dispatch = useDispatch();
  const params = useParams();
  const { modules, formats } = QuillSetting();
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

    dispatch(updateEvent(props.eventId, postData)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        dispatch(getSingleEvent(params.id));
        emitter(MentionFilter(details));
      }
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
        <Card.Header className="pb-0">
          <h5 className="fw-bold m-0">Update event</h5>
        </Card.Header>
        <Card.Body>
          <Form.Group className="d-flex gap-2 mb-3">
            <div className="w-100">
              <FormLabel>Title</FormLabel>
              <Form.Control
                type="title"
                placeholder="Event Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="w-100">
              <FormLabel>Size</FormLabel>
              <Form.Control
                type="number"
                placeholder="Maximum Members"
                value={maxMembers || ""}
                onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                min="2"
                required
              />
            </div>
          </Form.Group>

          <Form.Group>
            <FormLabel>Description</FormLabel>
            <ReactQuill
              name="details"
              theme="snow"
              modules={modules}
              formats={formats}
              value={details}
              onChange={(value) => setDetails(value)}
            />
          </Form.Group>
          <div className="d-flex justify-content-end mt-3">
            <CTAButton
              type={""}
              btnStyle={"postBtn-placements"}
              variant={"primary"}
              onClick={props.handleUpate}
              placeholder={
                <div className="d-flex align-items-center">Cancel</div>
              }
            />
            <CTAButton
              type={"submit"}
              btnStyle={"postBtn-placements cta_button formBtn"}
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
                <div className="d-flex align-items-center ">Publish</div>
              }
            />
          </div>
        </Card.Body>
      </Card>{" "}
    </Form>
  );
}

export default UpdateEvent;
