import React from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getUserProfile, vote } from "../../services/actions/userActions";
import { VoteArrow } from "../../layouts/icons";
import * as ResponseStatus from "../../services/constants/responseStatus";
import CustomTooltip from "../../layouts/customTooltip";

function Vote(props) {
  const dispatch = useDispatch();

  const voteUser = (status) => {
    const postData = { status: status };
    dispatch(vote(props.user.id, postData)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        dispatch(getUserProfile(props.user.username));
      }
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
      <CustomTooltip
        tooltip={props.user.voteStatus === "UPVOTE" ? "Starred" : "Star"}
        id="tooltip-vote"
      >
        <div className="d-flex justify-content-center align-items-center">
          <VoteArrow />
          <span className="ms-1">
            {!props.fullW ? props.user.totalVote : ""}
          </span>
          <span className="visually-hidden">up vote</span>
        </div>
      </CustomTooltip>
    </Button>
  );
}

export default Vote;
