import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  requestToJoin,
  getAllEvents,
  getSingleEvent,
} from "../../actions/eventActions";
import { Loading } from "../SiteElements/loader";
import ModalItem from "./modal-item";
import { SearchParam } from "../Utilities/search-param";
import { useLocation, useParams } from "react-router-dom";
import { emitter } from "../client/socket";
import { Plus } from "../SiteElements/icons";

function JoinEvent(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});

  let pageId = SearchParam();
  const params = useParams();
  const location = useLocation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      eventId: props.eventId,
    };

    dispatch(requestToJoin(postData, setLoad, setError)).then(() => {
      location.pathname.includes("event")
        ? dispatch(getSingleEvent(params.id))
        : dispatch(getAllEvents(pageId));
      emitter([props.userName]);
    });
  };
  return (
    <>
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
    </>
  );
}

export default JoinEvent;
