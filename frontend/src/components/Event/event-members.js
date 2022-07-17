import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import CTAButton from "../SiteElements/cta-button";
import Loading from "../SiteElements/loading";
import MemberStatus from "./member-status";
import { RiUserStarLine } from "react-icons/ri";


function EventMembers(props) {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);
  const [load, setLoad] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [postData, setPostData] = useState({});

  useEffect(() => {
    if (modalShow) {
      dispatch(getEventMembers(props.eventId, setMembers));
    }
  }, [modalShow]);

  return (
    <div className="mb-4">
      <CTAButton
        type={""}
        btnStyle={"postBtn-placements"}
        variant={"primary"}
        onClick={() => setModalShow(true)}
        placeholder={<RiUserStarLine />}
      />

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
          {members.length == 0 ? (
            <strong>Nobody here yet....</strong>
          ) : (
            members.map((member) => (
              <div className="d-flex justify-content-between" key={member.id}>
                {props.currentUser == member.userId
                  ? `Your request (${member.username})`
                  : member.username}

                <MemberStatus
                  eventId={props.eventId}
                  userId={member.userId}
                  memberStatus={member.status}
                  eventCreator={props.userId}
                  currentUser={props.currentUser}
                />
              </div>
            ))
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventMembers;
