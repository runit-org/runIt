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
import {
  GetParamFromURL,
  GroupEntriesByMonthAndYear,
} from "../../../utilities/utility-service";

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

export const GetVotes = () => {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const [votesList, setVotesList] = useState([]);

  //reducer data
  var votes = useSelector((userReducer) => userReducer.users.votes);
  const { currentPage, next, count, results } = votes;

  //get data on initial load
  useEffect(() => {
    if (currentPage === 0) dispatch(getVotes(1, setLoad));
  }, [dispatch, currentPage]);

  //get data when traversing page
  const handleLoadMore = () => {
    if (next) {
      let pageParam = GetParamFromURL(next, "page");
      dispatch(getVotes(pageParam, setLoad));
    }
  };

  useEffect(() => {
    setVotesList(results);
  }, [results]);

  return {
    load,
    votesList,
    handleLoadMore,
    count,
    hasMore: !!next,
  };
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
      let pageParam = GetParamFromURL(next, "page");
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
