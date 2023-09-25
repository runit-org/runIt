import React from "react";
import { Button, Card, Container } from "react-bootstrap";

import UserProfile from "../../components/profile/userProfile";
import UpdateDetails from "../../components/profile/updateDetails";
import Timeline from "../../layouts/timeline";
import { useEditor } from "../../hooks/useEditor";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";
import { GetActivity } from "../../components/profile/utilities/actionHandlers";
// import { AffiliatedEvents } from "../event/utilities/actionHandlers";

function Profile() {
  const { editorMode, handleClick } = useEditor(false);
  // const affiliatedEvents = AffiliatedEvents(2);
  const { authUser } = useVerifyAuthUser();
  const activity = GetActivity();

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <SectionHeader size={"md"}>User Acitvity</SectionHeader>
          <Timeline data={activity.results ? activity.results : []} />
        </Container>
      </div>

      <div className="sidebar_calendarDash">
        <div className="sidebar-wrapper">
          <Container className="content-wrapper">
            <Card>
              <Card.Body>
                {authUser ? (
                  editorMode ? (
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
                  )
                ) : (
                  <UserProfile />
                )}
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Profile;
