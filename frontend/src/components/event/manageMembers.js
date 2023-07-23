import React, { useContext, useState } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  getSingleEvent,
  memberStatus,
} from "../../services/actions/eventActions";
import { Loading } from "../../layouts/loader";
import { Link } from "react-router-dom";
import { emitter } from "../client/socket";
import { EventMembersHandler } from "./utilities/actionHandlers";
import { Pending } from "./utilities/eventBuilder";
import { SingleEventContext } from "../../pages/singleEventDash";
import { Cross, Tick } from "../../layouts/icons";
import { DisplayImage } from "../../layouts/userDisplayImg";

function ManageMembers() {
  const dispatch = useDispatch();
  const eventData = useContext(SingleEventContext);

  const [load, setLoad] = useState(false);
  const eventMembers = EventMembersHandler(eventData.id);
  const pendingMembers = Pending(eventMembers, eventData.user);

  const manageUser = async (status, memberId) => {
    const postData = {
      eventId: eventData.id,
      userId: memberId,
      status: status,
    };

    dispatch(memberStatus(postData, setLoad)).then(() => {
      dispatch(getSingleEvent(eventData.id));
      emitter(pendingMembers.map((member) => member.username));
    });
  };

  return (
    <Card className="event-card pt-2 pb-2">
      <Card.Header className="fw-bold">
        New requests ({pendingMembers.length})
      </Card.Header>

      <Card.Body>
        {pendingMembers.length > 0 ? (
          pendingMembers.map((member) => {
            return (
              <div
                key={member.id}
                className="userInfo-div row"
                style={{ padding: " 10px 0 10px 0" }}
              >
                <div className="d-flex align-items-center col col-sm-9">
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

                    <small className="d-block text-muted">{member.email}</small>
                  </div>
                </div>
                <div className="d-flex align-items-center col col-sm-3">
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
        ) : (
          <Card.Text>No new requests...</Card.Text>
        )}
      </Card.Body>
    </Card>
  );
}

export default ManageMembers;