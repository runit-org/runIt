import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import img from "../../logo192.png";
import ReactQuill from "react-quill";
import { updateEvent, getAllEvents } from "../../actions/eventActions";
import { useDispatch } from "react-redux";
import CTAButton from "../SiteElements/cta-button";
import { RiCloseFill, RiSendPlaneLine } from "react-icons/ri";
import { QuillFormatting } from "../SiteElements/quill-format";
import { SearchParam } from "../Utilities/search-param";

function UpdateEvent(props, { handleUpate }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.title);
  const [maxMembers, setMaxMembers] = useState(props.maxMembers);
  const [details, setDetails] = useState(props.details);

  var quillSetting = QuillFormatting();
  let pageId = SearchParam();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      maxMember: maxMembers,
      details: details,
    };

    dispatch(updateEvent(props.eventId, postData)).then(() => {
      dispatch(getAllEvents(pageId));
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
          <div className="d-flex">
            <img src={img} className="userProf-img me-2" alt="Img" />
            <div className="me-auto">
              <Form.Group className="d-flex">
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
            </div>
            <div>
              <CTAButton
                type={""}
                btnStyle={"postBtn-placements"}
                variant={"primary"}
                onClick={props.handleUpate}
                placeholder={<RiCloseFill />}
              />
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {/* <ReactQuill
            modules={quillSetting[1]}
            formats={quillSetting[0]}
            theme="snow"
            value={details}
            onChange={setDetails}
          /> */}
          <Form.Group>
            <Form.Control
              placeholder="What's on your mind?"
              as="textarea"
              value={details || ""}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </Form.Group>
          <div className="d-flex justify-content-end">
            <CTAButton
              type={"submit"}
              btnStyle={"btn-placements"}
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
              placeholder={<RiSendPlaneLine />}
            />
          </div>
        </Card.Body>
      </Card>{" "}
    </Form>
  );
}

export default UpdateEvent;
