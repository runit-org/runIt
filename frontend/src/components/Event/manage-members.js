import React, { useState, useEffect } from "react";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getEventMembers, memberStatus } from "../../actions/eventActions";
import Loading from "../SiteElements/loader";
import { Link } from "react-router-dom";

function ManageMembers(props) {
  const dispatch = useDispatch();
  const [eventMbs, setEventMbs] = useState([]);
  const [load, setLoad] = useState(false);
  let pendingMembers = eventMbs.filter(
    (member) =>
      member.status === "PENDING" &&
      member.userId !== props.currentUser &&
      props.eventData.user === props.currentUser
  );

  useEffect(() => {
    if (props.eventData.id) {
      dispatch(getEventMembers(props.eventData.id));
    }
  }, [dispatch, props.eventData.id]);

  var allEventMembers = useSelector(
    (eventReducer) => eventReducer.events.eventMembers.data
  );
  useEffect(() => {
    if (allEventMembers) {
      setEventMbs(allEventMembers);
    }
  }, [allEventMembers]);

  const manageUser = async (status, memberId) => {
    const postData = {
      eventId: props.eventData.id,
      userId: memberId,
      status: status,
    };

    dispatch(memberStatus(postData, setLoad));
  };

  return (
    <Card>
      <Card.Header>New requests</Card.Header>

      <Card.Body>
        {pendingMembers.length > 0
          ? pendingMembers.map((member) => {
              return (
                <div
                  key={member.id}
                  className="d-flex userInfo-div  justify-content-between"
                >
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
                        vodka@email.com{/* {props.eventData.email} */}
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  strokeWidth="1.5"
                                  stroke="currentColor"
                                  width="20"
                                  height="20"
                                  style={{
                                    backgroundColor: "#DFF2BF",
                                    color: "#4F8A10",
                                    padding: "1px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4.5 12.75l6 6 9-13.5"
                                  />
                                </svg>
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
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  width="20"
                                  height="20"
                                  style={{
                                    backgroundColor: "#FFD2D2",
                                    color: "#D8000C",
                                    padding: "1px",
                                    borderRadius: "4px",
                                  }}
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
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
