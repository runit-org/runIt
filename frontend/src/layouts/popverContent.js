import React from "react";
import {
  UserCardInfo,
  VoteBadge,
} from "../components/profile/helper/profileBuilder";
import Vote from "../components/profile/vote";
import UserProfileHandler from "../components/profile/helper/actionHandlers.js";
import { ArrowRight, Smiley } from "./icons";
import { DisplayImage } from "./userDisplayImg";
import { VerifiedRender } from "../routes/verifiedRender";

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
                href={`/profile/settings?user=${user.username}`}
              >
                {user.username}
              </a>

              <small className="d-block text-muted">{user.email}</small>
            </div>
          </div>

          <div className="mt-3 ">
            <VoteBadge votes={user.totalVote} />

            <small className="d-block text-muted mt-2">
              {user.statusMessage ? (
                <>
                  <Smiley /> {user.statusMessage}
                </>
              ) : (
                ""
              )}
            </small>
            <UserCardInfo
              lastLogin={user.last_login}
              numParticipatedEvents={user.numParticipatedEvents}
              size={"sm"}
            />

            <div className="mt-2">
              <a
                href={`/profile/settings?user=${user.username}`}
                className="text-decoration-none"
              >
                View profile <ArrowRight />
              </a>
            </div>
          </div>

          <VerifiedRender>
            {user.username !== localStorage.getItem("username") ? (
              <div className="mt-4">
                <Vote user={user} fullW={true} />
              </div>
            ) : (
              ""
            )}
          </VerifiedRender>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default UserPopoverContent;
