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
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
          className={props.voteStatus === "UPVOTE" ? "user_vote" : ""}
        >
          <path
            fillRule="evenodd"
            d="M12 20.25a.75.75 0 01-.75-.75V6.31l-5.47 5.47a.75.75 0 01-1.06-1.06l6.75-6.75a.75.75 0 011.06 0l6.75 6.75a.75.75 0 11-1.06 1.06l-5.47-5.47V19.5a.75.75 0 01-.75.75z"
            clipRule="evenodd"
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
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
          className={props.voteStatus === "DOWNVOTE" ? "user_vote" : ""}
        >
          <path
            fillRule="evenodd"
            d="M12 3.75a.75.75 0 01.75.75v13.19l5.47-5.47a.75.75 0 111.06 1.06l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 111.06-1.06l5.47 5.47V4.5a.75.75 0 01.75-.75z"
            clipRule="evenodd"
          />
        </svg>

        <span className="visually-hidden">down vote</span>
      </Button>
    </ButtonGroup>
  );
}

export default Vote;
