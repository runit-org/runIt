import { useContext } from "react";
import { UserContext } from "../context/userProvider";

export function VerifiedRender({ children }) {
  const { currentUser } = useContext(UserContext);
  return currentUser.is_email_verified ? children : null;
}
