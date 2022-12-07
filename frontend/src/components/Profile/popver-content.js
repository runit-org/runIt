import React from "react";
import { VoteBadge } from "./utilities/profile-builder";
import Vote from "./vote";
import UserProfileHandler from "./utilities/action-handlers.js";
import { ArrowRight } from "../SiteElements/icons";

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
                Visit profile <ArrowRight />
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
