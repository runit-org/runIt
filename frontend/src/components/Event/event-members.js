import React from "react";
import { ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalItem from "./modal-item";
import { EventMembersHandler } from "./utilities/action-handlers";
import { Accepted } from "./utilities/event-builder";

function EventMembers(props) {
  const ref = React.createRef();
  const eventMembers = EventMembersHandler(props.eventId);
  const acceptedMembers = Accepted(eventMembers);

  return (
    <>
      <ModalItem
        ref={ref}
        customBtn={""}
        btnIcon={
          <div className="d-flex img-group">
            {acceptedMembers.slice(0, 4).map((member) => {
              return (
                <img
                  key={member.id}
                  src={member.gravatarImage}
                  className="members-img "
                  alt="Img"
                />
              );
            })}
            {acceptedMembers.length > 4 ? (
              <span className="members-count">+{eventMembers.length - 4}</span>
            ) : (
              ""
            )}
          </div>
        }
        error={""}
        title={"Members"}
        content={
          <>
            {eventMembers.length === 0 ? (
              <strong>Nobody here yet....</strong>
            ) : (
              <ListGroup className="members-list" variant="flush">
                {acceptedMembers.map((member) => (
                  <ListGroup.Item key={member.id}>
                    <div className="d-flex align-items-center">
                      <img
                        src={member.gravatarImage}
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
                          {member.email}
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
