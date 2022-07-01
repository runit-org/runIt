import React, { useState, useEffect } from "react";
import { Row, Form, Button, Container, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import Loading from "../SiteElements/Loading";

function MemberStatus(props) {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      eventId: props.eventId,
      userId: props.userId,
      status: 1,
    };

    dispatch(memberStatus(postData, setLoad));
  };

  return (
    <div className="mb-4">
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <Button type="submit" className="mb-2 mt-3 w-25">
          {(() => {
            if (load) {
              return <Loading />;
            } else {
              return <>Accept</>;
            }
          })()}
        </Button>
      </Form>
    </div>
  );
}

export default MemberStatus;
