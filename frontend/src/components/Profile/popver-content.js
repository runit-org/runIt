import React, { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../actions/userActions";
import Vote from "./vote";

const UserPopoverContent = (props) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (props.data) {
      dispatch(getUserProfile(props.data));
    }
  }, [dispatch, props.data]);

  var profile = useSelector((userReducer) => userReducer.users.userProfile);

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.data);
    }
  }, [profile]);

  return (
    <>
      {userProfile ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <img
              src={userProfile.gravatarImage}
              className="userProf-img"
              alt="use profile"
            />
            <div className="ms-3">
              <h6 className="m-0">{userProfile.username}</h6>
              <small className="d-block text-muted">{userProfile.email}</small>
            </div>
          </div>

          <div className="mt-3 ">
            <Badge id="vote_badge" className="mb-2">
              {userProfile.totalVote > 1 ? (
                <>{userProfile.totalVote} votes</>
              ) : (
                <>{userProfile.totalVote} vote</>
              )}
            </Badge>
            <small className="d-block text-muted">Melbourne, Australia</small>
            <small className="d-block text-muted">
              Last event created was in the past week
            </small>
            <div className="mt-2">
              <a
                href={`/profile?user=${userProfile.username}`}
                className="text-decoration-none"
              >
                Visit profile{" "}
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
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </a>
            </div>
          </div>

          {userProfile.username !== localStorage.getItem("username") ? (
            <div className="mt-4">
              <Vote
                userId={userProfile.id}
                username={userProfile.username}
                voteStatus={userProfile.voteStatus}
              />
            </div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserPopoverContent;
