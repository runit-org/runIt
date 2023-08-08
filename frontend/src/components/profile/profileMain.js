import React from "react";
import { Button, Card, Container } from "react-bootstrap";

import UserProfile from "./userProfile";
import UpdateDetails from "./updateDetails";
import Timeline from "../../layouts/timeline";
import { useEditor } from "../../hooks/useEditor";

function ProfileMain() {
  const { editorMode, handleClick } = useEditor(false);

  return (
    <>
      <div className="content">
        <Container className="content-wrapper ">
          <Timeline />
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
