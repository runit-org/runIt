import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/userProvider";
import UserProfileHandler from "../components/profile/helper/actionHandlers";

//checks if current route user is the authenticated user
export function useVerifyAuthUser() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const userContext = useContext(UserContext);
  const user = UserProfileHandler(
    param ? param : userContext.currentUser.username
  );

  var authUser = user ? user.username === userContext.currentUser.username : "";

  //returns current user validation value and user info
  return { authUser, user };
}
