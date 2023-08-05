import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserProfile,
  getVotes,
} from "../../../services/actions/userActions";

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

export const GetVotes = (pageId) => {
  const dispatch = useDispatch();
  const [votesList, setVotesList] = useState({});
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    dispatch(getVotes(pageId));
  }, [dispatch, pageId]);

  var votes = useSelector((userReducer) => userReducer.users.votes);

  useEffect(() => {
    if (votes && votes.results) {
      setVotesList(votes);
      if (pageId) setUserList([...new Set([...userList, ...votes.results])]);
    }
  }, [pageId, votes.next]);

  return userList;
};
