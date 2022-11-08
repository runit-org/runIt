import React, { useState, useEffect, useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getEventMembers } from "../../actions/eventActions";
import ModalItem from "./modal-item";

function EventMembers(props) {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const [modalShow, setModalShow] = useState(false);
  const [eventMbs, setEventMbs] = useState([]);
  let acceptedMembers = eventMbs.filter(
    (member) => member.status === "ACCEPTED"
  );

  let img = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  const handler = useCallback((modalShow) => {
    setModalShow(modalShow);
  }, []);

  useEffect(() => {
    if (modalShow) {
      dispatch(getEventMembers(props.eventId));
    }
  }, [dispatch, modalShow, props.eventId]);

  var allEventMembers = useSelector(
    (eventReducer) => eventReducer.events.eventMembers.data
  );
  useEffect(() => {
    if (allEventMembers) {
      setEventMbs(allEventMembers);
    }
  }, [allEventMembers]);

  return (
    <>
      <ModalItem
        parentCallback={handler}
        ref={ref}
        customBtn={""}
        btnIcon={
          <div className="d-flex img-group">
            {acceptedMembers.slice(0, 4).map((member) => {
              return (
                <img
                  key={member.id}
                  src={img}
                  className="members-img "
                  alt="Img"
                />
              );
            })}
            {acceptedMembers.length > 4 ? (
              <span className="members-count">+{eventMbs.length - 4}</span>
            ) : (
              ""
            )}
          </div>
        }
        error={""}
        title={"Members"}
        content={
          <>
            {eventMbs.length === 0 ? (
              <strong>Nobody here yet....</strong>
            ) : (
              <ListGroup className="members-list" variant="flush">
                {acceptedMembers.map((member) => (
                  <ListGroup.Item key={member.id}>
                    <div className="d-flex align-items-center">
                      <img
                        src={props.img}
                        className="userProf-img"
                        alt="use profile"
                      />
                      <div className="ms-4">
                        <Link
                          to={{
                            pathname: "/profile",
                            search: `user=${member.username}`,
                          }}
                        >
                          @{member.username}
                        </Link>

                        <small className="d-block text-muted">
                          user@email.com
                        </small>
                      </div>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </>
        }
        subBtn={""}
        subHandler={null}
      />
    </>
  );
}

export default EventMembers;
