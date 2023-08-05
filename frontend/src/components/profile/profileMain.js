import React from "react";
import { Card, Container } from "react-bootstrap";

import UserProfile from "./userProfile";

function ProfileMain() {
  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <Card>
            <Card.Body>
              <UserProfile />
            </Card.Body>
          </Card>
        </Container>
      </div>

      <div className="sidebar_calendarDash">
        <div className="sidebar-wrapper">
          <Container className="content-wrapper">
            <Card>
              <Card.Body>
                <UserProfile />
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ProfileMain;
