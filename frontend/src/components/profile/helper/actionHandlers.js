import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getActivity,
  getUserProfile,
  getVotes,
} from "../../../services/actions/userActions";
import {
  BAD_REQUEST,
  SERVER_ERROR,
} from "../../../services/constants/responseStatus";
import { useNavigate } from "react-router-dom";

const UserProfileHandler = (data) => {
  const dispatch = useDispatch();
  const [userProfile, setUserProfile] = useState({});
  let navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(getUserProfile(data)).then((res) => {
        let { status } = res;
        if (status === BAD_REQUEST || status === SERVER_ERROR) {
          navigate("*");
        }
      });
    }
  }, [dispatch, data, navigate]);

  var profile = useSelector((userReducer) => userReducer.users.userProfile);

  useEffect(() => {
    if (profile) {
      setUserProfile(profile.data);
    }
  }, [profile]);

  return userProfile;
};

export default UserProfileHandler;

export const GetVotes = (pageId) => {
  const dispatch = useDispatch();
  const [votesList, setVotesList] = useState({});

  useEffect(() => {
    dispatch(getVotes(pageId));
  }, [dispatch, pageId]);

  var votes = useSelector((userReducer) => userReducer.users.votes);

  useEffect(() => {
    if (votes) {
      setVotesList(votes);
    }
  }, [pageId, votes]);

  /* useEffect(() => {
    if (test && votes.results) {
      // setTest([...test, ...votes.results.splice(0, pageId * 10)]);
    }
  }, [pageId, votes.results]);

; */

  return votesList;
};

export const GetActivity = () => {
  const dispatch = useDispatch();
  const [activity, setActivity] = useState({});

  useEffect(() => {
    dispatch(getActivity());
  }, [dispatch]);

  var userActivity = useSelector((userReducer) => userReducer.users.activity);

  useEffect(() => {
    if (userActivity) {
      setActivity(userActivity);
    }
  }, [userActivity]);

  return activity;
};
