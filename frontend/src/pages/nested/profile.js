import React from "react";
import { Button, Card, Container } from "react-bootstrap";
import UserProfile from "../../components/profile/userProfile";
import UpdateDetails from "../../components/profile/updateDetails";
import Timeline from "../../layouts/timeline";
import { useEditor } from "../../hooks/useEditor";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";
import { GetActivity } from "../../components/profile/helper/actionHandlers";
import { Loading } from "../../layouts/loader";
import CTAButton from "../../layouts/ctaButton";
import CurrentUserProfile from "../../components/profile/currentUserProfile";
// import { AffiliatedEvents } from "../event/utilities/actionHandlers";

function Profile() {
  const { editorMode, handleClick } = useEditor(false);
  // const affiliatedEvents = AffiliatedEvents(2);
  const { authUser, user } = useVerifyAuthUser();
  const { count, hasMore, load, groupedEntries, handleLoadMore } = GetActivity(
    user ? user.username : ""
  );

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          {count > 0 ? (
            <>
              <SectionHeader size={"md"}>User Acitvity</SectionHeader>
              <Timeline data={groupedEntries || []} />
              {hasMore && (
                <CTAButton
                  type={"submit"}
                  btnStyle={"formBtn cta_button d-block mt-2 w-100"}
                  variant={"primary"}
                  isLoading={load}
                  onClick={handleLoadMore}
                  placeholder={
                    <div className="d-flex align-items-center justify-content-center">
                      Show more
                    </div>
                  }
                />
              )}
            </>
          ) : !load && count === 0 ? (
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
                      <CurrentUserProfile />
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
