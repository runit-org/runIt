import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../services/actions/eventActions";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modalItem";
import { useNavigate } from "react-router-dom";
import { OK } from "../../services/constants/responseStatus";
import { RESET_CURRENT_PAGE } from "../../services/constants/types";

function RemoveEvent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeEvent(props.eventId, setLoad)).then(({ status }) => {
      if (status === OK) {
        dispatch({
          type: RESET_CURRENT_PAGE,
        });
        navigate("/posts");
      }
    });
  };

  return (
    <ModalItem
      ref={(ref, btnRef)}
      customBtn={""}
      btnIcon={<div className="d-flex align-items-center">Delete</div>}
      title={"Delete Event"}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          <strong>Are you sure you want to delete this event?</strong>
          <ul className="mt-2">
            <li>This cannot be undone</li>
            <li>Will remove all affiliations related to this event</li>
          </ul>
        </div>

        <div className="mt-3 d-flex justify-content-center">
          <Button
            type="submit"
            onClick={() => btnRef.current.setModalShow()}
            variant="danger"
            className="w-100"
          >
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Delete this event</>;
              }
            })()}
          </Button>
        </div>
      </Form>
    </ModalItem>
  );
}

export default RemoveEvent;
