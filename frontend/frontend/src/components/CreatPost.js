import React, { useState } from "react";
import {
  Col,
  Row,
  Form,
  FloatingLabel,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createNewEvent } from "../actions/eventActions";
import ReactQuill from "react-quill";
import Loading from "./Loading";

function CreatePost() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState({});
  const [maxMembers, setMaxMembers] = useState({});
  const [details, setDetails] = useState({});
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);

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
    <div className="mb-4">
      <Button className="w-100" onClick={() => setModalShow(true)}>Create new event</Button>

      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Create an event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
                        onChange={(e) =>
                          setMaxMembers(parseInt(e.target.value))
                        }
                        required
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
              </Row>

              <ReactQuill theme="snow" value={details} onChange={setDetails} />
              <div className="d-flex justify-content-center">
                {/*  <Button type="submit" className="mb-2 mt-3 w-25">
              Add Friends
            </Button> */}
                <Button type="submit" className="mb-2 mt-3 w-25">
                  {(() => {
                    if (load) {
                      return <Loading />;
                    } else {
                      return <>Confirm</>;
                    }
                  })()}
                </Button>
              </div>
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreatePost;
