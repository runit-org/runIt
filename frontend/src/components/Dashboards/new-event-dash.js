import React, { useState } from "react";
import { Card, Container } from "react-bootstrap";

import CreateEvent from "../Event/create-event";

function NewEventDash() {
  const [displayData, setDisplayData] = useState({});
  let img = "https://flowbite.com/docs/images/people/profile-picture-5.jpg";

  const postData_display = (data) => {
    if (data) {
      setDisplayData(data);
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content">
          <Container>
            <CreateEvent postData_display={postData_display} />
          </Container>
        </div>

        <div className="sidebar_eventDash">
          <div className="sidebar-wrapper">
            <Container>
              <Card className="event-card">
                <Card.Header>
                  <div className="d-flex justify-content-between">
                    <img src={img} className="userProf-img me-3" alt="Img" />
                  </div>
                </Card.Header>
                <Card.Body>
                  <div className="details_textarea">
                    <h4>
                      {displayData.title ? displayData.title : "Event Title"}
                    </h4>
                    <span>
                      {displayData.details
                        ? displayData.details
                        : "Event information"}
                    </span>
                  </div>
                  <div className="details_textarea">
                    <h6>Details</h6>
                    <small className="text-muted">
                      Host:{" "}
                      <a
                        href={`profile?user=${localStorage.getItem(
                          "username"
                        )}`}
                        className="text-decoration-none"
                      >
                        @{localStorage.getItem("username")}
                      </a>
                    </small>
                    <br />
                    <small className="text-muted">
                      Posted:{" "}
                      {new Date().toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </small>
                    <br />
                    {displayData.date !== "" || displayData.time !== "" ? (
                      <small className="text-muted">
                        Date: {displayData.date}{" "}
                        {displayData.time +
                          " " +
                          new Date()
                            .toLocaleTimeString("en-us", {
                              timeZoneName: "short",
                            })
                            .split(" ")[2]}
                      </small>
                    ) : (
                      <small className="text-muted">Date:</small>
                    )}
                  </div>
                </Card.Body>
              </Card>
            </Container>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewEventDash;
