import React, { useState, useEffect } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import Loading from "../SiteElements/Loading";

function MemberStatus(props) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      eventId: props.eventId,
      userId: props.userId,
      status: status,
    };

    dispatch(memberStatus(postData, setLoad));
  };

  return (
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        {props.memberStatus == 0 ? (
          <>
            <Button
              type="submit"
              className="me-2"
              onClick={(e) => setStatus(1)}
            >
              {(() => {
                if (load) {
                  return <Loading />;
                } else {
                  return <>Accept</>;
                }
              })()}
            </Button>
            <Button type="submit" onClick={(e) => setStatus(2)}>
              {(() => {
                if (load) {
                  return <Loading />;
                } else {
                  return <>Reject</>;
                }
              })()}
            </Button>
          </>
        ) : props.memberStatus == 1 ? (
          <strong>Accepted</strong>
        ) : (
          <strong>Rejected</strong>
        )}
      </Form>
  );
}

export default MemberStatus;
