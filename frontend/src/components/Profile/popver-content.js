import React from "react";
import { VoteBadge } from "./utilities/profile-builder";
import Vote from "./vote";
import UserProfileHandler from "./utilities/action-handlers.js";
import { ArrowRight } from "../../layouts/icons";
import { DisplayImage } from "../../layouts/user-displayimg";

const UserPopoverContent = (props) => {
  const user = UserProfileHandler(props.data);

  return (
    <>
      {user ? (
        <div className="w-100">
          <div className="d-flex align-items-center userInfo-div">
            <DisplayImage image={user.gravatarImage} />
            <div className="ms-3">
              <a
                className="username_tags-dark"
                href={`/profile?user=${user.username}`}
              >
                {user.username}
              </a>

              <small className="d-block text-muted">{user.email}</small>
            </div>
          </div>

          <div className="mt-3 ">
            <VoteBadge votes={user.totalVote} />

            <small className="d-block text-muted">{user.statusMessage}</small>
            <small className="d-block text-muted">
              Participated in 4 events
            </small>
            <small className="d-block text-muted">
              Last active: {new Date(user.last_login).toLocaleDateString()}
            </small>
            <div className="mt-2">
              <a
                href={`/profile?user=${user.username}`}
                className="text-decoration-none"
              >
                View profile <ArrowRight />
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
