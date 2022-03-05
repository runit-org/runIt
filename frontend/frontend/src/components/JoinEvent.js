import React, { useState } from "react";
import {
  Row,
  Form,
  Button,
  Container,
  Modal,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestToJoin } from "../actions/eventActions";
import Loading from "./Loading";

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
      <Button  onClick={() => setModalShow(true)}>Join</Button>

      <Modal
        size="lg"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Request to join 
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
                <p>Send request to join {props.eventTitle}.</p>
              </Row>

            
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
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default JoinEvent;
