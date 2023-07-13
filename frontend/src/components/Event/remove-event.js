import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../actions/eventActions";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modal-item";
import { useNavigate } from "react-router-dom";
import { Delete } from "../../layouts/icons";

function RemoveEvent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeEvent(props.eventId, setLoad, setError, navigate));
  };

  return (
    <>
      <ModalItem
        ref={(ref, btnRef)}
        customBtn={""}
        btnIcon={
          <div className="d-flex align-items-center">
            <Delete />
            Delete
          </div>
        }
        error={error}
        title={"Delete Event"}
        content={
          <>
            {" "}
            Are you sure you want to delete <strong>{props.eventTitle}</strong>?
            Any affiliations to this event will also be nullified.
          </>
        }
        subBtn={
          <div className="mt-3">
            <Button type="submit">
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
              onClick={() => btnRef.current.setModalShow(false)}
            >
              Back
            </Button>
          </div>
        }
        subHandler={handleSubmit}
      />
    </>
  );
}

export default RemoveEvent;
