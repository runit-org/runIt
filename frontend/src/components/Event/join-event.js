import React, { useState } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestToJoin } from "../../actions/eventActions";
import Loading from "../SiteElements/loading";
import { RiAddBoxLine } from "react-icons/ri";
import CTAButton from "../SiteElements/cta-button";

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
      <CTAButton
        type={""}
        btnStyle={"postBtn-placements"}
        variant={"primary"}
        onClick={() => setModalShow(true)}
        placeholder={<RiAddBoxLine />}
      />

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Request to join</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Row>
              {error ? <small className="mb-4">{error}</small> : ""}
              <div>
                <strong className="me-auto">
                  Request to join - {props.eventTitle}.
                </strong>
                <Button type="submit" className="float-end">
                  {(() => {
                    if (load) {
                      return <Loading />;
                    } else {
                      return <>Join</>;
                    }
                  })()}
                </Button>
              </div>
            </Row>{" "}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default JoinEvent;
