import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import { RiUserStarLine } from "react-icons/ri";
import Loading from "../SiteElements/loader";
import ModalItem from "./modal-item";

function EventMembers2(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();

  const [memberId, setMemberId] = useState();
  const [modalShow, setModalShow] = useState(false);
  const [eventMbs, setEventMbs] = useState([]);
  const [load, setLoad] = useState(false);
  const [status, setStatus] = useState();

  const handler = useCallback((modalShow) => {
    setModalShow(modalShow);
  }, []);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      eventId: props.eventId,
      userId: memberId,
      status: status,
    };

    dispatch(memberStatus(postData, setLoad));
  };

  const permitUser = (status, id) => {
    setStatus(status);
    setMemberId(id);
  };

  return (
    <div className="mb-4">
      <ModalItem
        parentCallback={handler}
        ref={ref}
        btnIcon={<RiUserStarLine />}
        error={""}
        title={"Member"}
        content={
          <>
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

                  {member.status === "PENDING" &&
                  props.userId == props.currentUser ? (
                    <>
                      <Button
                        type="submit"
                        className="me-2 btn-cancel"
                        onClick={() => permitUser(2, member.userId)}
                      >
                        {(() => {
                          if (load) {
                            return <Loading />;
                          } else {
                            return <>Reject</>;
                          }
                        })()}
                      </Button>
                      <Button
                        type="submit"
                        onClick={() => permitUser(1, member.userId)}
                      >
                        {(() => {
                          if (load) {
                            return <Loading />;
                          } else {
                            return <>Accept</>;
                          }
                        })()}
                      </Button>
                    </>
                  ) : (
                    member.status
                  )}
                  <hr />
                </div>
              ))
            )}
          </>
        }
        subBtn={""}
        subHandler={handleSubmit}
      />
    </div>
  );
}

export default EventMembers2;
