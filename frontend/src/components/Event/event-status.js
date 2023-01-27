import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getSingleEvent, updateStatus } from "../../actions/eventActions";
import { Loading } from "../SiteElements/loader";
import ModalItem from "./modal-item";
import { useParams } from "react-router-dom";
import { emitter } from "../client/socket";
import { PencilSquare } from "../SiteElements/icons";
import { CANCELLED, FINISHED } from "./utilities/types";
import { EventMembersHandler } from "./utilities/action-handlers";

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
      () => {
        dispatch(getSingleEvent(params.id));
        emitter(eventMembers.map((member) => member.username));
      }
    );
  };
  return (
    <>
      <ModalItem
        ref={(ref, btnRef)}
        customBtn={""}
        btnIcon={
          <div className="d-flex align-items-center">
            <PencilSquare />
            Status
          </div>
        }
        error={error}
        title={"Update Status"}
        content={
          <>
            <Form.Group className="mb-3">
              <Form.Label className="m-1">
                Mark your event as <strong>FINISHED</strong> or{" "}
                <strong>CANCELLED</strong>
              </Form.Label>
              <Form.Control
                type="title"
                placeholder="Christmas social"
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
          </>
        }
        subBtn={
          <div>
            <hr />
            <Button
              className="me-3 btn-cancel"
              onClick={() => btnRef.current.setModalShow(false)}
            >
              Back
            </Button>
            <Button type="submit">
              {(() => {
                if (load) {
                  return <Loading />;
                } else {
                  return <>Update</>;
                }
              })()}
            </Button>
          </div>
        }
        subHandler={handleSubmit}
      />
    </>
  );
}

export default EventStatus;
