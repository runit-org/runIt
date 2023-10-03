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
import { GroupEntriesByMonthAndYear } from "../../../utilities/utility-service";

const UserProfileHandler = (data) => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [userProfile, setUserProfile] = useState({});
  var profile = useSelector((userReducer) => userReducer.users.userProfile);

  useEffect(() => {
    if (data) {
      dispatch(getUserProfile(data)).then(({ status }) => {
        if (status === BAD_REQUEST || status === SERVER_ERROR) {
          navigate("*");
        }
      });
    }
  }, [dispatch, data, navigate]);

  useEffect(() => {
    if (profile && profile.data) {
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

export const GetActivity = (userName) => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [groupedEntries, setGroupedEntries] = useState({});

  //reducer data
  var userActivity = useSelector((userReducer) => userReducer.users.activity);
  const { currentPage, next, count } = userActivity;

  //get data on initial load
  useEffect(() => {
    if (userName && currentPage === 0) {
      dispatch(getActivity(1, userName, setLoad));
    }
  }, [dispatch, userName, currentPage]);

  //get data when traversing page
  const handleLoadMore = () => {
    if (next) {
      const url = new URL(next);
      const urlParams = new URLSearchParams(url.search);
      const pageParam = urlParams.get("page");
      dispatch(getActivity(pageParam, userName, setLoad));
    }
  };

  useEffect(() => {
    setGroupedEntries(GroupEntriesByMonthAndYear(userActivity.results));
  }, [userActivity]);

  return {
    load,
    groupedEntries,
    handleLoadMore,
    count,
    hasMore: !!next,
  };
};
