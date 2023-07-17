import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../../services/actions/userActions";

const UserProfileHandler = (data) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    if (data) {
      dispatch(getUserProfile(data));
    }
  }, [dispatch, data]);

  var profile = useSelector((userReducer) => userReducer.users.userProfile);

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.data);
    }
  }, [profile]);

  return userProfile;
};

export default UserProfileHandler;
