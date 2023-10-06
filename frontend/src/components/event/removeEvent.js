import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../services/actions/eventActions";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modalItem";
import { useNavigate } from "react-router-dom";
import { OK } from "../../services/constants/responseStatus";

function RemoveEvent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeEvent(props.eventId, setLoad, setError, navigate)).then(
      ({ status }) => {
        if (status === OK) {
          navigate("/posts", {
            replace: true,
          });
        }
      }
    );
  };

  return (
    <ModalItem
      ref={(ref, btnRef)}
      customBtn={""}
      btnIcon={
        <div className="d-flex align-items-center">
          {/* <Delete /> */}
          Delete
        </div>
      }
      title={"Delete Event"}
      error={error}
    >
      {" "}
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          Are you sure you want to delete <strong>{props.eventTitle}</strong>?
          Any affiliations to this event will also be nullified.
        </div>

        <div className="mt-3">
          <Button type="submit" onClick={() => btnRef.current.setModalShow()}>
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Remove</>;
              }
            })()}
          </Button>
          <Button
            className="me-3 btn-cancel"
            onClick={() => btnRef.current.setModalShow()}
          >
            Back
          </Button>
        </div>
      </Form>
    </ModalItem>
  );
}

export default RemoveEvent;
