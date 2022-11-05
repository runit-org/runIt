import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { requestToJoin, getAllEvents } from "../../actions/eventActions";
import Loading from "../SiteElements/loader";
import { RiAddBoxLine } from "react-icons/ri";
import ModalItem from "./modal-item";
import { SearchParam } from "../Utilities/search-param";

function JoinEvent(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  let pageId = SearchParam();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      eventId: props.eventId,
    };

    dispatch(requestToJoin(postData, setLoad, setError)).then(() => {
      dispatch(getAllEvents(pageId));
    });
  };

  return (
    <>
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
    </>
  );
}

export default JoinEvent;
