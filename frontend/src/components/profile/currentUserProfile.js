import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserProfile } from "../../services/actions/userActions";
import { DisplayImage } from "../../layouts/userDisplayImg";
import { UserCardInfo, VoteBadge } from "./helper/profileBuilder";
import { Username } from "../../layouts/username";
import { useVerifyAuthUser } from "../../hooks/useCheckCurrUser";
import { VerifiedRender } from "../../routes/verifiedRender";
import UserStatus from "./userStatus";
import { Loading } from "../../layouts/loader";

function CurrentUserProfile() {
  const dispatch = useDispatch();
  const { authUser } = useVerifyAuthUser();

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile.data
  );

  if (!currProfile || Object.keys(currProfile).length === 0) {
    return <Loading />;
  }
  const {
    gravatarImage,
    username,
    email,
    totalVote,
    statusMessage,
    last_login,
    numParticipatedEvents,
  } = currProfile || {};

  return (
    <>
      {currProfile && (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <DisplayImage image={gravatarImage} />
            <div className="ms-3">
              <Username username={username} />
              <small className="d-block text-muted">{email}</small>
            </div>

            <div className="position-absolute top-0 end-0 p-1">
              <VoteBadge votes={totalVote} />
            </div>
          </div>

          <VerifiedRender>
            {authUser ? (
              <div className="my-3">
                <UserStatus />
              </div>
            ) : (
              <small className="d-block text-muted content_sm5">
                {statusMessage}
              </small>
            )}
          </VerifiedRender>
          <div className="mt-3 ">
            <UserCardInfo
              lastLogin={last_login}
              numParticipatedEvents={numParticipatedEvents}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default CurrentUserProfile;
