import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUserProfile, vote } from "../../actions/userActions";

function Vote(props) {
  const dispatch = useDispatch();

  const voteUser = (status) => {
    const postData = { status: status };
    dispatch(vote(props.userId, postData)).then(() => {
      dispatch(getUserProfile(props.username));
    });
  };
  return (
    <ButtonGroup className="vote_btnGroup" vertical>
      <Button
        variant="primary"
        onClick={() => {
          voteUser(1);
        }}
        className="user_vote"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          fill="currentColor"
          width="24"
          height="24"
          className={props.voteStatus === "UPVOTE" ? "user_vote" : ""}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M78.9,37.8l-30-30.6C48.1,6.4,47.1,6,46,6s-2.1,0.4-2.9,1.2l-30,30.6c-1.1,1.1-1.5,3.1-0.8,4.5 c0.6,1.5,2.1,2.6,3.7,2.6h13v37c0,2.2,2.3,4,4.5,4h25c2.2,0,4.5-1.8,4.5-4V45h13c1.6,0,3.1-1.2,3.7-2.6C80.3,40.9,80,39,78.9,37.8z  M58.5,37c-2.2,0-3.5,1.4-3.5,3.6V78H37V40.6c0-2.2-1.3-3.6-3.5-3.6h-8L46,16.1L66.5,37H58.5z"
          />
        </svg>

        <span className="visually-hidden">up vote</span>
      </Button>
      <h6 className="m-0 w-100 d-flex justify-content-center">
        {props.voteCount}
      </h6>
      <Button
        variant="primary"
        onClick={() => {
          voteUser(-1);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 92 92"
          fill="currentColor"
          width="24"
          height="24"
          className={props.voteStatus === "DOWNVOTE" ? "user_vote" : ""}
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M79.7,49.6C79.1,48.2,77.6,47,76,47H63V10c0-2.2-2.3-4-4.5-4h-25C31.3,6,29,7.8,29,10v37H16 c-1.6,0-3.1,1.2-3.7,2.6c-0.6,1.5-0.3,3.3,0.8,4.4l30,30.7c0.8,0.8,1.8,1.2,2.9,1.2c1.1,0,2.1-0.4,2.9-1.2l30-30.7 C80,52.9,80.3,51.1,79.7,49.6z M46,75.9L25.5,55h8c2.2,0,3.5-1.4,3.5-3.6V14h18v37.4c0,2.2,1.3,3.6,3.5,3.6h8L46,75.9z"
          />
        </svg>
        <span className="visually-hidden">down vote</span>
      </Button>
    </ButtonGroup>
  );
}

export default Vote;
