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
import { CustomTable, CustomTableCells } from "../../layouts/customTable";

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
    <div className="mt-3">
      <CustomTable
        headerItems={
          <th colSpan={2}>
            <div className="d-flex justify-content-between align-items-center mx-2">
              New requests ({pendingMembers.length})
            </div>
          </th>
        }
        tableItems={
          pendingMembers.length > 0 ? (
            <>
              {pendingMembers.map((member, i) => {
                return (
                  <tr key={i} className="table_row">
                    <CustomTableCells cols={"col-11"}>
                      <div className="d-flex align-items-center col col-sm-9">
                        <DisplayImage image={member.gravatarImage} />

                        <div className="ms-4">
                          <Link
                            to={{
                              pathname: "/profile/settings",
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
                    </CustomTableCells>

                    <CustomTableCells cols={"col-1"}>
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
                    </CustomTableCells>
                  </tr>
                );
              })}
            </>
          ) : (
            <tr className="table_row">
              <td className="text-center">
                <div className="table-content">
                  <h6 className="p-0 m-0">No requests</h6>
                </div>
              </td>
            </tr>
          )
        }
      />
    </div>
  );
}

export default ManageMembers;
