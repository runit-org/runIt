import React, { useState } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestToJoin } from "../../actions/eventActions";
import Loading from "../SiteElements/loader";
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
        <Modal.Header>
          <Modal.Title>
            <RiAddBoxLine />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {error ? <small className="mb-4">{error}</small> : ""}
            <div>
              <div className="d-flex justify-content-between">
                <p>
                  Request to join <strong>{props.eventTitle}</strong>? The
                  creator of this event will be notified.
                </p>
              </div>

              <div>
                <hr />
                <Button
                  className="me-3 btn-cancel"
                  onClick={() => setModalShow(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {(() => {
                    if (load) {
                      return <Loading />;
                    } else {
                      return <>Join</>;
                    }
                  })()}
                </Button>
              </div>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default JoinEvent;
