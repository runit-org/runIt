import {
  GET_CURRENT_USER_PROFILE,
  GET_USER_ACTIVITY,
  GET_USER_PROFILE,
  GET_VOTES,
  RESET_VOTE,
} from "../constants/types";

const initialState = {
  userProfile: {},
  currProfile: {},
  votes: {
    results: [],
    next: null,
    currentPage: 0,
  },
  activity: {
    results: [],
    next: null,
    currentPage: 0,
  },
};

export default function setUser(state = initialState, action) {
  switch (action.type) {
    case GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload,
      };
    case GET_CURRENT_USER_PROFILE:
      return {
        ...state,
        currProfile: action.payload,
      };

    case GET_VOTES:
      return {
        ...state,
        votes: {
          results: [...state.votes.results, ...action.payload.results],
          next: action.payload.next,
          currentPage: state.votes.currentPage + 1,
          count: action.payload.count,
        },
      };
    case GET_USER_ACTIVITY:
      return {
        ...state,
        activity: {
          results: [...state.activity.results, ...action.payload.results],
          next: action.payload.next,
          currentPage: state.activity.currentPage + 1,
          count: action.payload.count,
        },
      };
    case RESET_VOTE:
      return {
        ...state,
        votes: {
          results: [],
          next: null,
          currentPage: 0,
        },
      };

    default:
      return state;
  }
}
