import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestToJoin } from "../../actions/eventActions";
import Loading from "../SiteElements/loader";
import { RiAddBoxLine } from "react-icons/ri";
import ModalItem from "./modal-item";

function JoinEvent(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  // const [modalShow, setModalShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      eventId: props.eventId,
    };

    dispatch(requestToJoin(postData, setLoad, setError));
  };

  return (
    <div className="mb-4">
      <ModalItem
        ref={(ref, btnRef)}
        btnIcon={<RiAddBoxLine />}
        error={error}
        title={"Join Event"}
        content={
          <>
            Request to join <strong>{props.eventTitle}</strong>? The creator of
            this event will be notified.
          </>
        }
        subBtn={
          <div>
            <hr />
            <Button
              className="me-3 btn-cancel"
              onClick={() => btnRef.current.setModalShow(false)}
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
        }
        subHandler={handleSubmit}
      />
    </div>
  );
}

export default JoinEvent;
