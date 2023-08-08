import React, { useState } from "react";
import { Button, Card, Container } from "react-bootstrap";

import UserProfile from "./userProfile";
import UpdateDetails from "./updateDetails";

function ProfileMain() {
  const [editorMode, setEditorMode] = useState(false);
  function handleClick() {
    setEditorMode(!editorMode);
  }

  return (
    <>
      <div className="content">
        <Container className="content-wrapper ">
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
                {editorMode ? (
                  <UpdateDetails toggleEditor={handleClick} />
                ) : (
                  <>
                    <UserProfile />
                    <Button
                      variant="primary"
                      className="w-100"
                      onClick={handleClick}
                    >
                      Edit profile
                    </Button>
                  </>
                )}
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default ProfileMain;
