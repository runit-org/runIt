import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Loading from "../SiteElements/loader";
import ModalItem from "../Event/modal-item";
import { SearchParam } from "../Utilities/search-param";
import { useNavigate } from "react-router-dom";
import { getAllComments, removeComment } from "../../actions/commentActions";

function RemoveComment(props) {
  const dispatch = useDispatch();
  //   let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  //   let pageId = SearchParam(props.eventCounts);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeComment(props.commentId, setLoad, setError)).then(() => {
      dispatch(getAllComments(props.eventId));
      /*   navigate(`/posts?page=${pageId}`, {
        replace: true,
        state: { id: pageId },
      }); */
    });
  };

  return (
    <div>
      <ModalItem
        ref={(ref, btnRef)}
        customBtn={""}
        btnIcon={
          <div className="d-flex align-items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              width="20"
              height="20"
              className="me-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
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
