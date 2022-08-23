import React, { useState } from "react";
import { Col, Row, Card, Form, FloatingLabel } from "react-bootstrap";
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
      {" "}
      <Card className={props.cardStyle}>
        <Card.Body>
          <Card.Header>
            {" "}
            <Row>
              <Col lg={1}>
                <img src={img} className="userProf-img" alt="Img"></img>
              </Col>
              <Col md="auto">
                <Form.Group className="mb d-inline-flex">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Event Title"
                    className="mb-3"
                  >
                    <Form.Control
                      type="title"
                      placeholder="Event Title"
                      value={title}
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
                      value={maxMembers || ""}
                      onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                      min="2"
                      required
                    />
                  </FloatingLabel>
                </Form.Group>
              </Col>
              <Col className="text-end d-flex justify-content-end">
                <div>
                  <CTAButton
                    type={""}
                    btnStyle={"postBtn-placements"}
                    variant={"primary"}
                    onClick={props.handleUpate}
                    placeholder={<RiCloseFill />}
                  />
                </div>
              </Col>
            </Row>
          </Card.Header>

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
