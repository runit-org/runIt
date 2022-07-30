import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEventMembers } from "../../actions/eventActions";
import CTAButton from "../SiteElements/cta-button";
import MemberStatus from "./member-status";
import { RiUserStarLine } from "react-icons/ri";

function EventMembers(props) {
  const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [eventMbs, setEventMbs] = useState([]);

  useEffect(() => {
    if (modalShow) {
      dispatch(getEventMembers(props.eventId));
    }
  }, [modalShow]);

  var allEventMembers = useSelector(
    (eventReducer) => eventReducer.events.eventMembers.data
  );
  useEffect(() => {
    if (allEventMembers) {
      setEventMbs(allEventMembers);
    }
  }, [allEventMembers]);

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
        <Modal.Header>
          <Modal.Title>
            <RiUserStarLine />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Member List </h4>

          {eventMbs.length == 0 ? (
            <strong>Nobody here yet....</strong>
          ) : (
            eventMbs.map((member) => (
              <div key={member.id}>
                <strong>
                  {" "}
                  {props.currentUser == member.userId
                    ? `Your request (${member.username})`
                    : member.username}{" "}
                </strong>
                <p>A user has requested to join this event.</p>
                <MemberStatus
                  eventId={props.eventId}
                  userId={member.userId}
                  memberStatus={member.status}
                  eventCreator={props.userId}
                  currentUser={props.currentUser}
                />
                <hr />
              </div>
            ))
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default EventMembers;
