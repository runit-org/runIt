import React, { useState } from "react";
import { Form, Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../actions/eventActions";
import CTAButton from "../SiteElements/cta-button";
import Loading from "../SiteElements/loader";
import { AiOutlineDelete } from "react-icons/ai";

function RemoveEvent(props) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(removeEvent(props.eventId, setLoad, setError));
    setModalShow(false);
  };

  return (
    <div className="mb-4">
      <CTAButton
        type={""}
        btnStyle={"postBtn-placements"}
        variant={"primary"}
        onClick={() => setModalShow(true)}
        placeholder={<AiOutlineDelete />}
      />

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header /* closeButton */>
          <Modal.Title>
            <AiOutlineDelete />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h4>Delete Event </h4>
            {error ? <small className="mb-4">{error}</small> : ""}
            <div className="d-flex justify-content-between">
              <p>
                {" "}
                Are you sure you want to delete{" "}
                <strong>{props.eventTitle}</strong>? Any affiliations to this
                event will also be nullified.
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
                    return <>Remove</>;
                  }
                })()}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RemoveEvent;
