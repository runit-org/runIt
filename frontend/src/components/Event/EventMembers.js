import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import Loading from "../SiteElements/Loading";
import MemberStatus from "./MemberStatus";

function EventMembers(props) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [load, setLoad] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (modalShow) {
      console.log(props.eventId);

      dispatch(getEventMembers(props.eventId, setMembers));
    }
  }, [modalShow]);

  return (
    <div className="mb-4">
      <Button onClick={() => setModalShow(true)}>Members</Button>

      <Modal
        size="md"
        show={modalShow}
        onHide={() => setModalShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            All members
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {members.map((member) => (
            <div className="d-flex justify-content-between" key={member.id}>
              User Id: {member.userId}
              <MemberStatus
                eventId={props.eventId}
                userId={member.userId}
                memberStatus={member.status}
              />
            </div>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventMembers;
