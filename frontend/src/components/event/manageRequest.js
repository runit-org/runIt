import React, { useState, useRef } from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getEventMembers,
  getSingleEvent,
  memberStatus,
} from "../../services/actions/eventActions";
import { Loading } from "../../layouts/loader";
import ModalItem from "../../layouts/modalItem";
import { emitter } from "../client/socket";
import * as ResponseStatus from "../../services/constants/responseStatus";

function ManageRequest(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);

  const manageUser = async (status, memberId) => {
    const postData = {
      eventId: props.eventData.id,
      userId: memberId,
      status: status,
    };

    dispatch(memberStatus(postData, setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        dispatch(getSingleEvent(props.eventData.id));
        dispatch(getEventMembers(postData.eventId));
        btnRef.current.setModalShow();
        emitter(props.pendingMembers.map((member) => member.username));
      }
    });
  };

  return (
    <ModalItem
      ref={(ref, btnRef)}
      customBtn={""}
      btnIcon={
        <div className="formBtn cta_button btn btn-primary btn-sm">Respond</div>
      }
      title={"Request to join"}
    >
      <div className="mt-2">
        {props.member.username} has requested to join your event.
        <div className="d-flex gap-2 mt-3">
          <span
            variant="light"
            className="postBtn-placements cta_button p-0"
            onClick={() => manageUser(1, props.member.userId)}
          >
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return (
                  <Button>
                    {(() => {
                      if (load) {
                        return <Loading />;
                      } else {
                        return <>Accept</>;
                      }
                    })()}
                  </Button>
                );
              }
            })()}
          </span>
          <span
            variant="light"
            className="postBtn-placements cta_button p-0 "
            onClick={() => manageUser(2, props.member.userId)}
          >
            {(() => {
              if (load) {
                return <Loading />;
              } else {
                return (
                  <Button
                    type="submit"
                    onClick={() => btnRef.current.setModalShow()}
                    variant="danger"
                    className="w-100"
                  >
                    {(() => {
                      if (load) {
                        return <Loading />;
                      } else {
                        return <>Reject</>;
                      }
                    })()}
                  </Button>
                );
              }
            })()}
          </span>
        </div>
      </div>
    </ModalItem>
  );
}

export default ManageRequest;
