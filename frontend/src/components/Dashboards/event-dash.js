import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Card, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getSingleEvent } from "../../actions/eventActions";
import EventItem from "../Event/event-item";
import UserProfile from "../Profile/user-profile";
import img from "../../logo192.png";

function EventDash() {
  const dispatch = useDispatch();
  const params = useParams();
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(getSingleEvent(params.id));
  }, [dispatch, params.id]);

  var event = useSelector((securityReducer) => securityReducer.events.events);

  useEffect(() => {
    if (event) {
      setEventData(event.data);
    }
  }, [event]);

  console.log(eventData);
  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content">
          <Container>
            {eventData ? <EventItem eventData={eventData} /> : ""}
          </Container>
        </div>

        <div className="sidebar_eventDash">
          <div className="sidebar-wrapper">
            <Card>
              <Card.Header>Event Members</Card.Header>
              <Card.Body>
                <div className="d-flex userInfo-div  justify-content-between">
                  <div className="d-flex align-items-center">
                    <img src={img} className="userProf-img" alt="use profile" />

                    <div className="ms-4">
                      <Link
                        to={""}
                        /*  to={{
                        pathname: "/profile",
                        search: `user=${userProfile.username}`,
                      }} */
                      >
                        @vodka{/* {userProfile.username} */}
                      </Link>

                      <small className="d-block text-muted">
                        vodka@email.com{/* {userProfile.email} */}
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
                      >
                        <span className="d-flex align-items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            width="20"
                            height="20"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        </span>
                      </Button>
                      <Button
                        variant="light"
                        className="postBtn-placements cta_button"
                      >
                        <span className="d-flex align-items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            width="20"
                            height="20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </span>
                      </Button>
                    </ButtonGroup>
                  </div>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Body>
                <h6 className="mb-4">Latest Activity</h6>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDash;
