import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SingleEventHandler } from "./helper/actionHandlers";
import { Pending } from "./helper/eventBuilder";
import { SingleEventContext } from "../../pages/singleEventDash";
import { DisplayImage } from "../../layouts/user/userDisplayImg";
import { CustomTable, CustomTableCells } from "../../layouts/customTable";
import { PROFILE, SETTINGS } from "../../routes/routes";
import ManageRequest from "./manageRequest";

function JoinRequest() {
  const { eventData } = useContext(SingleEventContext);
  const { eventMbs } = SingleEventHandler(1);
  const pendingMembers = Pending(eventMbs, eventData.user);

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
                              pathname: `/${PROFILE}/${SETTINGS}`,
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
                      <ManageRequest
                        eventData={eventData}
                        pendingMembers={pendingMembers}
                        member={member}
                      />
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

export default JoinRequest;
