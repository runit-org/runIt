import { useContext } from "react";
import { useSearchParams } from "react-router-dom";
import { UserContext } from "../context/userProvider";
import UserProfileHandler from "../components/profile/helper/actionHandlers";

//checks if current route user is the authenticated user
export function useVerifyAuthUser() {
  const [searchParams] = useSearchParams();
  const param = searchParams.get("user");
  const { currentUser } = useContext(UserContext);
  const user = UserProfileHandler(param || currentUser.username);
  var authUser = user ? user.username === currentUser.username : false;

  //returns current user validation value and user info
  return { authUser, user };
}
