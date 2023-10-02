import React from "react";
import { Button, Card, Container } from "react-bootstrap";

import UserProfile from "../../components/profile/userProfile";
import UpdateDetails from "../../components/profile/updateDetails";
import Timeline from "../../layouts/timeline";
import { useEditor } from "../../hooks/useEditor";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";
import {
  GetActivity,
  GetActivity2,
} from "../../components/profile/helper/actionHandlers";
import { Loading } from "../../layouts/loader";
// import { AffiliatedEvents } from "../event/utilities/actionHandlers";

function Profile() {
  const { editorMode, handleClick } = useEditor(false);
  // const affiliatedEvents = AffiliatedEvents(2);
  const { authUser, user } = useVerifyAuthUser();
  /* const { activity, load, groupedEntries, handleLoadMore } = GetActivity(
    user ? user.username : ""
  ); */

  const { activity, load, groupedEntries, handleLoadMore } = GetActivity2(
    user ? user.username : ""
  );

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          {activity.results.length > 0 ? (
            <>
              <SectionHeader size={"md"}>User Acitvity</SectionHeader>
              <Timeline data={groupedEntries || []} />
              <button onClick={handleLoadMore}>Show More</button>
            </>
          ) : !load && activity.results.length === 0 ? (
            <div>
              <h1>Nothing yet...</h1>
              <small>
                No activity has been recorded for {user ? user.username : ""} at
                this time. An activity log will become available once the user
                initiates an action or interaction.
              </small>
            </div>
          ) : (
            <Loading />
          )}
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
