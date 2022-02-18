import React, { useState, useEffect } from "react";
import {
  Col,
  Row,
  Card,
  Form,
  FloatingLabel,
  Button,
  Container,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { createNewEvent } from "../actions/eventActions";
import ReactQuill from "react-quill";
import Loading from "./Loading";
import ErrorToast from "./ErrorToast";

function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState({});
  const [maxMembers, setMaxMembers] = useState({});
  const [details, setDetails] = useState({});
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      title: title,
      maxMember: maxMembers,
      details: details,
    };

    dispatch(createNewEvent(postData, setLoad, setShow, setError));
  };

  return (
    <div className="mb-4">
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
                    required
                  />
                </FloatingLabel>
              </Form.Group>
            </Col>
          </Row>

          <ReactQuill theme="snow" value={details} onChange={setDetails} />
          <div className="d-flex justify-content-between">
          <Button type="submit" className="mb-2 mt-3 w-25">
              Add Friends
            </Button>
            <Button type="submit" className="mb-2 mt-3 w-25">
              {(() => {
                if (load) {
                  return <Loading />;
                } else {
                  return <>Post</>;
                }
              })()}
            </Button>
            
          </div>
        </Container>
      </Form>
    </div>
  );
}

export default CreatePost;
