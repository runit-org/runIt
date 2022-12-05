import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserProfile } from "../../actions/userActions";
import { VoteBadge } from "./utilities/profile-builder";

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
            <img
              src={currUserProfile.gravatarImage}
              className="userProf-img"
              alt="use profile"
            />
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
          <div className="mt-3 ">
            <VoteBadge votes={currUserProfile.totalVote} />
            <small className="d-block text-muted">
              <span className="d-inline-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width="14"
                  height="14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
                Melbourne, Australia
              </span>
            </small>
            <small className="d-block text-muted">
              <span className="d-inline-flex align-items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  width="14"
                  height="14"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                  />
                </svg>
                Last event created was in the past week
              </span>
            </small>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default CurrentUserProfile;
