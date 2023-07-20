import React from "react";
import { Button, ButtonGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUserProfile, vote } from "../../services/actions/userActions";
import { Thumbsup, Thumbsdown } from "../../layouts/icons";

function Vote(props) {
  const dispatch = useDispatch();

  const voteUser = (status) => {
    const postData = { status: status };
    dispatch(vote(props.userId, postData)).then(() => {
      dispatch(getUserProfile(props.username));
    });
  };

  return (
    <ButtonGroup className="vote_btnGroup gap-3">
      <Button
        variant="primary"
        onClick={() => {
          voteUser(1);
        }}
        className={props.voteStatus === "UPVOTE" ? "user_vote" : ""}
      >
        <Thumbsup />
        <span className="visually-hidden">up vote</span>
      </Button>

      <Button
        className={props.voteStatus === "DOWNVOTE" ? "user_vote" : ""}
        variant="primary"
        onClick={() => {
          voteUser(-1);
        }}
      >
        <Thumbsdown />

        <span className="visually-hidden">down vote</span>
      </Button>
    </ButtonGroup>
  );
}

export default Vote;
