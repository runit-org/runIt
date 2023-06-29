import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile } from "../../actions/userActions";
import { DisplayImage } from "../../Layouts/user-displayimg";
import { UserCardInfo, VoteBadge } from "./utilities/profile-builder";

function CurrentUserProfile() {
  const dispatch = useDispatch();
  const [currUserProfile, setCurrUserProfile] = useState({});

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile
  );

  useEffect(() => {
    if (currProfile) {
      setCurrUserProfile(currProfile.data);
    }
  }, [currProfile]);

  return (
    <>
      {currUserProfile ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <DisplayImage image={currUserProfile.gravatarImage} />
            <div className="ms-3">
              <Link
                to={{
                  pathname: "/profile",
                  search: `user=${currUserProfile.username}`,
                }}
              >
                @{currUserProfile.username}
              </Link>

              <small className="d-block text-muted">
                {currUserProfile.email}
              </small>
            </div>
          </div>
          <div className="mt-3">
            <VoteBadge votes={currUserProfile.totalVote} />
            <UserCardInfo />
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CurrentUserProfile;
