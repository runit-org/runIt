import React, { useState, useEffect, useRef } from "react";
import {
  Col,
  Row,
  Form,
  FloatingLabel,
  Container,
  Card,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent, getAllEvents } from "../../actions/eventActions";
import ReactQuill from "react-quill";
import CTAButton from "../SiteElements/cta-button";
import { RiSendPlaneLine } from "react-icons/ri";
import { QuillFormatting } from "../SiteElements/quill-format";
import { SearchParam } from "../Utilities/search-param";

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

  useEffect(() => {
    props.postData_display({
      title: title,
      maxMember: maxMembers,
      details: details,
      date: date,
      time: time,
    });
  }, [title, maxMembers, details, time, date]);

  var quillSetting = QuillFormatting();
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
    /* dispatch(createNewEvent(postData, setLoad, setError)).then(() => {
      dispatch(getAllEvents(pageId));
    }); */
    dispatch(createNewEvent(postData, setLoad, setError));
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
        <h3 className="fw-bold m-0">New event</h3>
      </Card.Header>
      <Card.Body>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          ref={formRef}
        >
          <div className="details_textarea">
            <Container className="new-post-container p-3">
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Event Title"
                      className="text-muted"
                    >
                      <Form.Control
                        type="title"
                        placeholder="Event Title"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput2"
                      label="Maximum Members"
                      className="text-muted"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Maximum Members"
                        onChange={(e) =>
                          setMaxMembers(parseInt(e.target.value))
                        }
                        min="2"
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput3"
                      label="Time"
                      className="text-muted"
                    >
                      <Form.Control
                        type="time"
                        placeholder="Time"
                        onChange={(e) => setTime(e.target.value)}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput4"
                      label="Date"
                      className="text-muted"
                    >
                      <Form.Control
                        type="date"
                        placeholder="Date"
                        onChange={(e) => setDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>

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
                  onChange={(e) => setDetails(e.target.value)}
                  rows={4}
                  required
                />
              </Form.Group>

              {/* <div className="d-flex justify-content-end">
                <CTAButton
                  type={"submit"}
                  btnStyle={"btn-placements"}
                  variant={"primary"}
                  formValidation={validateFormEmpty}
                  isLoading={load}
                  placeholder={<RiSendPlaneLine />}
                />
              </div> */}
            </Container>
          </div>

          <div className="d-flex justify-content-end mt-3">
            <CTAButton
              type={"submit"}
              btnStyle={"postBtn-placements cta_button"}
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
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
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
