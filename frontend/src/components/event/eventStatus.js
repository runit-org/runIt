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
import { EventMembersHandler } from "./helper/actionHandlers";
import * as ResponseStatus from "../../services/constants/responseStatus";

function EventStatus(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [status, setStatus] = useState(0);
  const [load, setLoad] = useState(false);

  const params = useParams();

  const eventMembers = EventMembersHandler(props.eventId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      status: status,
    };

    dispatch(updateStatus(props.eventId, postData, setLoad)).then(
      ({ status }) => {
        if (status === ResponseStatus.OK) {
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
      btnIcon={<div className="d-flex align-items-center">Status</div>}
      title={"Update Status"}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Form.Group className="mt-3">
          <Form.Label>
            Update your event status as <strong>FINISHED</strong> or{" "}
            <strong>CANCELLED</strong>
          </Form.Label>
           
          <small>
            <ul>
              <li>Status can only be updated once</li>
              <li>Event will remain as history but uninteractive</li>
            </ul>
          </small>
          <Form.Check
            type="radio"
            className="fw-bold"
            id="default-radio"
            label="Finished"
            name="status"
            value={2}
            onChange={(e) => setStatus(Number(e.target.value))}
            inline
          />
          <Form.Check
            type="radio"
            className="fw-bold"
            id="default-radio2"
            label="Cancelled"
            name="status"
            value={3}
            onChange={(e) => setStatus(Number(e.target.value))}
            inline
          />
        </Form.Group>

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
