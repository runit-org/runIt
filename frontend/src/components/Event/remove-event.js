import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent, getAllEvents } from "../../actions/eventActions";
import Loading from "../SiteElements/loader";
import { AiOutlineDelete } from "react-icons/ai";
import ModalItem from "./modal-item";
import { SearchParam } from "../Utilities/search-param";
import { useNavigate } from "react-router-dom";

function RemoveEvent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  let pageId = SearchParam(props.eventCounts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeEvent(props.eventId, setLoad, setError)).then(() => {
      dispatch(getAllEvents(pageId));
      navigate(`/posts?page=${pageId}`, {
        replace: true,
        state: { id: pageId },
      });
    });
  };

  return (
    <div>
      <ModalItem
        ref={(ref, btnRef)}
        btnIcon={<AiOutlineDelete />}
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
          <>
            <hr />
            <Button
              className="me-3 btn-cancel"
              onClick={() => btnRef.current.setModalShow(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={() => btnRef.current.setModalShow(false)}
            >
              {(() => {
                if (load) {
                  return <Loading />;
                } else {
                  return <>Remove</>;
                }
              })()}
            </Button>
          </>
        }
        subHandler={handleSubmit}
      />
    </div>
  );
}

export default RemoveEvent;
