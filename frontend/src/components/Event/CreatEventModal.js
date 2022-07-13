import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import CreateEvent from "./CreateEvent";

function CreateEventModal(props) {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="mb-4">
      <Button className={`${props.btnSize}`} onClick={() => setModalShow(true)}>
        New event
      </Button>

      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            Create an event
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateEvent />
          {/* <Form
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
          </Form> */}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default CreateEventModal;
