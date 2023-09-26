import React, { useContext } from "react";
import VerticalNav from "../layouts/verticalNav";
import { NavigationObj } from "../utilities/navigationObj";
import { Outlet, useSearchParams } from "react-router-dom";
import UserProfileHandler from "../components/profile/helper/actionHandlers";
import { UserContext } from "../context/userProvider";

function ProfileDash() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const { currentUser } = useContext(UserContext);
  const user = UserProfileHandler(param ? param : currentUser.username);

  return (
    <div style={{ position: "relative" }}>
      <div className="dash-container" id="calendar">
        <div className="sidebar" id="profile_sidebar">
          <div className="sidebar-wrapper">
            <div className="sidebar_left">
              <VerticalNav
                navObj={
                  currentUser.username === param
                    ? NavigationObj(user).profileNavCurrUser
                    : NavigationObj(user).profileNav
                }
              />
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

export default ProfileDash;
