import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modal-item";
import { usePageId } from "../../hooks/usePageId";
import { useNavigate } from "react-router-dom";
import {
  getAllComments,
  removeComment,
} from "../../services/actions/commentActions";
import { Delete } from "../../layouts/icons";

function RemoveComment(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  let pageId = usePageId(props.commentCount);

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
    <ModalItem
      ref={(ref, btnRef)}
      customBtn={""}
      btnIcon={
        <div className="d-flex align-items-center">
          <Delete />
          Delete
        </div>
      }
      title={"Delete Comment"}
      error={error}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          Are you sure you want to delete this comment? This can't be undone.
        </div>

        <div className="mt-3">
          <Button
            type="submit"
            onClick={
              error.success === "true"
                ? () => btnRef.current.setModalShow()
                : null
            }
          >
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Remove</>;
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

export default RemoveComment;
