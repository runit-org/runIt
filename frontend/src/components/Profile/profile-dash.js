import React from "react";
import { Card } from "react-bootstrap";
import UserProfile from "./user-profile";

function ProfileDash() {
  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container">
        <div className="content"></div>

        <div className="sidebar">
          <div className="sidebar-wrapper">
            <Card style={{ maxWidth: "20rem" }}>
              <Card.Body>
                <UserProfile />
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

export default ProfileDash;
