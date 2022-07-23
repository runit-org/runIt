import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FloatingLabel,
  Container,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../actions/eventActions";
import ReactQuill from "react-quill";
import CTAButton from "../SiteElements/cta-button";
import { RiSendPlaneLine } from "react-icons/ri";
import {QuillFormatting} from "../SiteElements/quill-format";

function CreateEvent() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [maxMembers, setMaxMembers] = useState("");
  const [details, setDetails] = useState("");
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [error, setError] = useState("");
  var quillSetting = QuillFormatting();


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
    };
    dispatch(createNewEvent(postData, setLoad, setError));
  };


  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Container className="new-post-container p-3">
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <FloatingLabel
                controlId="floatingInput"
                label="Event Title"
                className="mb-3"
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
                className="mb-3"
              >
                <Form.Control
                  type="number"
                  placeholder="Maximum Members"
                  onChange={(e) => setMaxMembers(parseInt(e.target.value))}
                  min="2"
                  required
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
        </Row>

        <ReactQuill
          modules={quillSetting[1]}
          formats={quillSetting[0]}
          theme="snow"
          value={details}
          onChange={setDetails}
        />

        <div className="d-flex justify-content-end">
          {/*  <Button type="submit" className="mb-2 mt-3 w-25">
              Add Friends
            </Button> */}
          <CTAButton
            type={"submit"}
            btnStyle={"btn-placements"}
            variant={"primary"}
            formValidation={validateFormEmpty}
            isLoading={load}
            placeholder={<RiSendPlaneLine />}
          />
        </div>
      </Container>
    </Form>
  );
}

export default CreateEvent;
