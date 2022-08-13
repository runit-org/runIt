import React, { useState, useRef, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeEvent } from "../../actions/eventActions";
import Loading from "../SiteElements/loader";
import { AiOutlineDelete } from "react-icons/ai";
import ModalItem from "./modal-item";
import { SearchParam } from "../search-param";
import { useNavigate } from "react-router-dom";

function RemoveEvent(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");
  const [modalShow, setModalShow] = useState(false);

  let pageId = SearchParam(props.eventCounts);

  useEffect(() => {
    if (props.eventCounts <= pageId * 10 - 10) {
      navigate("/posts?page=1", { replace: true });
    }
  }, [navigate, pageId, props.eventCounts]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeEvent(props.eventId, setLoad, setError, pageId));
    setModalShow(false);
  };

  return (
    <div className="mb-4">
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
            <Button type="submit">
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
