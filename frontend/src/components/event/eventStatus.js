import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getSingleEvent,
  updateStatus,
} from "../../services/actions/eventActions";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modalItem";
import { useParams } from "react-router-dom";
import { emitter } from "../client/socket";
import { CANCELLED, FINISHED } from "./helper/eventTypes";
import { EventMembersHandler } from "./helper/actionHandlers";
import * as ResponseStatus from "../../services/constants/responseStatus";

function EventStatus(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [status, setStatus] = useState("");
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});

  const params = useParams();

  const eventMembers = EventMembersHandler(props.eventId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      status: status,
    };

    dispatch(updateStatus(props.eventId, postData, setLoad, setError)).then(
      (res) => {
        if (res.status === ResponseStatus.OK) {
          dispatch(getSingleEvent(params.id));
          emitter(eventMembers.map((member) => member.username));
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
          {/* <PencilSquare /> */}
          Status
        </div>
      }
      title={"Update Status"}
      error={error}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          <Form.Group className="mb-3">
            <Form.Label className="m-1">
              Mark your event as <strong>FINISHED</strong> or{" "}
              <strong>CANCELLED</strong>
            </Form.Label>
            <Form.Control
              type="title"
              pattern="(FINISHED|CANCELLED)"
              onChange={(e) =>
                setStatus(
                  e.target.value === FINISHED
                    ? 2
                    : e.target.value === CANCELLED
                    ? 3
                    : ""
                )
              }
              required
            />
          </Form.Group>
          <div className="mt-2">
            <small className="text-muted">
              Note: The event status can only be updated once.
            </small>
          </div>
        </div>

        <div className="mt-3">
          <Button type="submit">
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Update</>;
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

export default EventStatus;
