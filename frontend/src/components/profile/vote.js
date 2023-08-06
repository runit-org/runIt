import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUserProfile, vote } from "../../services/actions/userActions";
import { VoteArrow } from "../../layouts/icons";

function Vote(props) {
  const dispatch = useDispatch();

  const voteUser = (status) => {
    const postData = { status: status };
    dispatch(vote(props.user.id, postData)).then(() => {
      dispatch(getUserProfile(props.user.username));
    });
  };

  var fullW = props.fullW ? "w-100" : "";

  return (
    <Button
      variant="primary"
      onClick={() => {
        voteUser(1);
      }}
      className={
        props.user.voteStatus === "UPVOTE"
          ? `user_vote vote_btn ${fullW} `
          : `vote_btn ${fullW} `
      }
    >
      <VoteArrow />
      <span className="d-block">
        {!props.fullW ? props.user.totalVote : ""}
      </span>
      <span className="visually-hidden">up vote</span>
    </Button>
  );
}

export default Vote;
