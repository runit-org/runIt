import React, { useContext, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { memberStatus } from "../../actions/eventActions";
import { Loading } from "../../layouts/loader";
import { Link } from "react-router-dom";
import { emitter } from "../client/socket";
import { EventMembersHandler } from "./utilities/action-handlers";
import { Pending } from "./utilities/event-builder";
import { SingleEventContext } from "../Dashboards/event-dash";
import { Cross, Tick } from "../../layouts/icons";
import { DisplayImage } from "../../layouts/user-displayimg";

function ManageMembers(props) {
  const dispatch = useDispatch();
  const eventData = useContext(SingleEventContext);

  const [load, setLoad] = useState(false);
  const eventMembers = EventMembersHandler(eventData.id);
  const pendingMembers = Pending(eventMembers, props.currentUser);

  const manageUser = async (status, memberId) => {
    const postData = {
      eventId: eventData.id,
      userId: memberId,
      status: status,
    };

    dispatch(memberStatus(postData, setLoad)).then(() => {
      emitter(pendingMembers.map((member) => member.username));
    });
  };

  return (
    <Card className="event-card">
      <Card.Header>New requests</Card.Header>

      <Card.Body>
        {pendingMembers.length > 0
          ? pendingMembers.map((member) => {
              return (
                <div
                  key={member.id}
                  className="d-flex userInfo-div  justify-content-between"
                  style={{ padding: " 20px 10px 10px 20px" }}
                >
                  <div className="d-flex align-items-center">
                    <DisplayImage image={member.gravatarImage} />

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
                  <div className="d-flex align-items-center">
                    <ButtonGroup
                      aria-label="Basic example"
                      className="w-100 gap-1"
                    >
                      <Button
                        variant="light"
                        className="postBtn-placements cta_button"
                        onClick={() => manageUser(1, member.userId)}
                      >
                        {(() => {
                          if (load) {
                            return <Loading />;
                          } else {
                            return (
                              <span className="d-flex align-items-center">
                                <Tick />
                              </span>
                            );
                          }
                        })()}
                      </Button>
                      <Button
                        variant="light"
                        className="postBtn-placements cta_button"
                        onClick={() => manageUser(2, member.userId)}
                      >
                        {(() => {
                          if (load) {
                            return <Loading />;
                          } else {
                            return (
                              <span className="d-flex align-items-center">
                                <Cross type="custom" />
                              </span>
                            );
                          }
                        })()}
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              );
            })
          : "No new requests.."}
      </Card.Body>
    </Card>
  );
}

export default ManageMembers;
