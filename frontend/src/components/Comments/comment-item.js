import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import { Mention } from "../../utilities/utility-service";
import { commentOptions } from "./utilities/comment-options";
import UpdateComment from "./update-comment";
import {
  getAllComments,
  likeUnlike,
} from "../../services/actions/commentActions";
import PopoverItem from "../Profile/popover-item";
import { CommentReacts } from "./utilities/comment-builder";
import { SingleEventContext } from "../../pages/single-event-dash";
import { SecurityContext } from "../../Context/security-context";
import { Ellipse } from "../../layouts/icons";
import { emitter } from "../client/socket";
import { DisplayImage } from "../../layouts/user-displayimg";
import { usePageId } from "../../hooks/usePageId";

function CommentItem(props) {
  const dispatch = useDispatch();

  const [editorMode, setEditorMode] = useState(false);
  const eventData = useContext(SingleEventContext);
  const currentUser = useContext(SecurityContext);

  const pageId = usePageId();

  function handleClick() {
    setEditorMode(!editorMode);
  }

  const commentReact = () => {
    dispatch(likeUnlike(props.commentData.id)).then(() => {
      dispatch(getAllComments(eventData.id, pageId));
      emitter([props.commentData.username]);
    });
  };

  return (
    <div className="event-card_dash m-0 mt-4">
      <div className="d-flex" id="card_header">
        <DisplayImage
          image={props.commentData.gravatarImage}
          imgClass="me-2"
          id="card-img"
        />
        <PopoverItem data={props.commentData.username} />

        <div className="me-auto">
          <span className="card-timestamp text-muted align-self-center">
            {props.commentData.humanTimeDiffCreatedAt} ago
          </span>
        </div>

        {currentUser === props.commentData.user ? (
          <Dropdown>
            <Dropdown.Toggle variant="light" size="sm" id="dropdown-basic">
              <Ellipse />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {commentOptions(
                props.commentData.id,
                eventData.id,
                props.commentCount,
                handleClick
              ).options_owner.map((i, index) => {
                return (
                  <div key={index} className="p-1">
                    {i.item}
                  </div>
                );
              })}
            </Dropdown.Menu>
          </Dropdown>
        ) : (
          ""
        )}
      </div>

      {!editorMode ? (
        <Card className="comment-item">
          <Card.Body>
            <Card.Text
              className="content_sm1"
              dangerouslySetInnerHTML={{
                __html: props.commentData.content
                  ? Mention(props.commentData.content)
                  : props.commentData.content,
              }}
            />

            <ButtonGroup
              aria-label="Basic example"
              className="mt-3 w-100 gap-2"
            >
              <Button
                variant="light"
                className="postBtn-placements cta_button p-0"
                onClick={() => {
                  commentReact();
                }}
              >
                <CommentReacts commentData={props.commentData} />
              </Button>
            </ButtonGroup>
          </Card.Body>
        </Card>
      ) : (
        <UpdateComment
          eventId={eventData.id}
          commentId={props.commentData.id}
          content={props.commentData.content}
          handleUpate={handleClick}
        />
      )}
    </div>
  );
}

export default CommentItem;
