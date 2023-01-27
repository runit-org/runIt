import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Loading } from "../SiteElements/loader";
import ModalItem from "../Event/modal-item";
import { SearchParam } from "../Utilities/search-param";
import { useNavigate } from "react-router-dom";
import { getAllComments, removeComment } from "../../actions/commentActions";
import { Delete } from "../SiteElements/icons";

function RemoveComment(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  let pageId = SearchParam(props.commentCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeComment(props.commentId, setLoad, setError)).then(() => {
      dispatch(getAllComments(props.eventId, pageId));
      navigate(`/event/${props.eventId}?page=${pageId}`, {
        replace: true,
        state: { id: pageId },
      });
    });
  };

  return (
    <div>
      <ModalItem
        ref={(ref, btnRef)}
        customBtn={""}
        btnIcon={
          <div className="d-flex align-items-center">
            <Delete />
            Delete
          </div>
        }
        error={error}
        title={"Delete Comment"}
        content={
          <>
            {" "}
            Are you sure you want to delete this comment? This can't be undone.
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

export default RemoveComment;
