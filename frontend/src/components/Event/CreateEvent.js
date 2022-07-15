import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Form,
  FloatingLabel,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../../actions/eventActions";
import ReactQuill from "react-quill";
import Loading from "../SiteElements/Loading";

function CreateEvent() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState({});
  const [maxMembers, setMaxMembers] = useState({});
  const [details, setDetails] = useState("");
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [error, setError] = useState("");

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

        <ReactQuill theme="snow" value={details} onChange={setDetails} />
        <div className="d-flex justify-content-end">
          {/*  <Button type="submit" className="mb-2 mt-3 w-25">
              Add Friends
            </Button> */}
          <Button
            type="submit"
            className="mt-3"
            disabled={validateFormEmpty}
          >
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Create</>;
              }
            })()}
          </Button>
        </div>
      </Container>
    </Form>
  );
}

export default CreateEvent;
