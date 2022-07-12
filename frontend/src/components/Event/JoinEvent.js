import React, { useState } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestToJoin } from "../../actions/eventActions";
import Loading from "../SiteElements/Loading";

function JoinEvent(props) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      eventId: props.eventId,
    };

    dispatch(requestToJoin(postData, setLoad, setError));
  };

  return (
    <div className="mb-4">
      <Button className="me-2" onClick={() => setModalShow(true)}>
        Join
      </Button>

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title >
            Request to join
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Container className="new-post-container ">
              <Row>
                {error ? <small className="mb-4">{error}</small> : ""}
                <strong className="d-flex justify-content-between">
                  Request to join the event - {props.eventTitle}.
                  <Button type="submit">
                    {(() => {
                      if (load) {
                        return <Loading />;
                      } else {
                        return <>Confirm</>;
                      }
                    })()}
                  </Button>
                </strong>
              </Row>{" "}
            </Container>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default JoinEvent;
