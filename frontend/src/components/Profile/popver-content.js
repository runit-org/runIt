import React from "react";
import { VoteBadge } from "./utilities/profile-builder";
import Vote from "./vote";
import UserProfileHandler from "./utilities/action-handlers.js";

const UserPopoverContent = (props) => {
  const user = UserProfileHandler(props.data);

  return (
    <>
      {user ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <img
              src={user.gravatarImage}
              className="userProf-img"
              alt="use profile"
            />
            <div className="ms-3">
              <h6 className="m-0">{user.username}</h6>
              <small className="d-block text-muted">{user.email}</small>
            </div>
          </div>

          <div className="mt-3 ">
            <VoteBadge votes={user.totalVote} />

            <small className="d-block text-muted">Melbourne, Australia</small>
            <small className="d-block text-muted">
              Participated in 4 events
            </small>
            <small className="d-block text-muted">
              Last event created was in the past week
            </small>
            <div className="mt-2">
              <a
                href={`/profile?user=${user.username}`}
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

          {user.username !== localStorage.getItem("username") ? (
            <div className="mt-4">
              <Vote
                userId={user.id}
                username={user.username}
                voteStatus={user.voteStatus}
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
