import React, { useState } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../actions/eventActions";
import CTAButton from "../SiteElements/CTAButton";
import Loading from "../SiteElements/Loading";
import { RiDeleteBin2Line } from "react-icons/ri";


function RemoveEvent(props) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(removeEvent(props.eventId, setLoad, setError));
  };

  return (
    <div className="mb-4">
      <CTAButton
        type={""}
        btnStyle={"postBtn-placements"}
        variant={"primary"}
        onClick={() => setModalShow(true)}
        placeholder={<RiDeleteBin2Line/>}
      />

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Remove Event</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <Row>
              {error ? <small className="mb-4">{error}</small> : ""}
              <strong className="d-flex justify-content-between">
                Remove the event - {props.eventTitle}.
                <Button type="submit">
                  {(() => {
                    if (load) {
                      return <Loading />;
                    } else {
                      return <>Remove</>;
                    }
                  })()}
                </Button>
              </strong>
            </Row>{" "}
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default RemoveEvent;
