import React, { useState, useRef } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modalItem";
import { usePageId } from "../../hooks/usePageId";
import { useNavigate } from "react-router-dom";
import {
  getAllComments,
  removeComment,
} from "../../services/actions/commentActions";
import { Delete } from "../../layouts/icons";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { EVENT } from "../../routes/routes";

function RemoveComment(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);

  let pageId = usePageId(props.commentCount);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(removeComment(props.commentId, setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        dispatch(getAllComments(props.eventId, pageId));
        navigate(`/${EVENT}/${props.eventId}?page=${pageId}`, {
          replace: true,
          state: { id: pageId },
        });
      }
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
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          <strong className="d-block">
            Are you sure you want to delete this comment?
          </strong>
          <span>This cannot be undone</span>
        </div>

        <div className="mt-3 d-flex justify-content-center">
          <Button
            type="submit"
            onClick={() => btnRef.current.setModalShow()}
            variant="danger w-100"
          >
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return <>Remove</>;
              }
            })()}
          </Button>
        </div>
      </Form>
    </ModalItem>
  );
}

export default RemoveComment;
