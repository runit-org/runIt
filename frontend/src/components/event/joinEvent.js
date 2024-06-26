import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  requestToJoin,
  getSingleEvent,
} from "../../services/actions/eventActions";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modalItem";
import { useLocation, useParams } from "react-router-dom";
import { emitter } from "../client/socket";
import { Plus } from "../../layouts/icons";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { RESET_CURRENT_PAGE } from "../../services/constants/types";

function JoinEvent(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const params = useParams();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      eventId: props.eventId,
    };

    dispatch(requestToJoin(postData, setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        if (location.pathname.includes("event")) {
          dispatch(getSingleEvent(params.id));
        } else {
          dispatch({
            type: RESET_CURRENT_PAGE,
          });
        }
        emitter([props.userName]);
      }
    });
  };
  return (
    <ModalItem
      ref={(ref, btnRef)}
      customBtn={"cta_button"}
      btnStyleFull={props.btnStyleFull}
      btnIcon={
        <div className="d-flex align-items-center">
          <Plus />
          Join
        </div>
      }
      title={"Join Event"}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          Request to join <strong>{props.eventTitle}</strong>? The creator of
          this event will be notified.
        </div>

        <div className="mt-3">
          <Button type="submit">
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Join</>;
              }
            })()}
          </Button>
          <Button
            className="me-3 btn-cancel"
            onClick={() => btnRef.current.setModalShow()}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </ModalItem>
  );
}

export default JoinEvent;
