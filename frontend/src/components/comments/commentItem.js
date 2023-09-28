import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, Card } from "react-bootstrap";
import { Mention } from "../../utilities/utility-service";
import { commentOptions } from "./helper/commentOptions";
import UpdateComment from "./updateComment";
import {
  getAllComments,
  likeUnlike,
} from "../../services/actions/commentActions";
import PopoverItem from "../../layouts/popoverItem";
import { CommentReacts } from "./helper/commentBuilder";
import { SingleEventContext } from "../../pages/singleEventDash";
import { SecurityContext } from "../../context/securityProvider";
import { emitter } from "../client/socket";
import { DisplayImage } from "../../layouts/userDisplayImg";
import { usePageId } from "../../hooks/usePageId";
import CustomDropdown from "../../layouts/customDropdown";
import { Username } from "../../layouts/username";
import { useEditor } from "../../hooks/useEditor";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { VerifiedRender } from "../../routes/verifiedRender";

function CommentItem(props) {
  const dispatch = useDispatch();
  const eventData = useContext(SingleEventContext);
  const currentUser = useContext(SecurityContext);
  const { editorMode, handleClick } = useEditor(false);
  const pageId = usePageId();

  const commentReact = () => {
    dispatch(likeUnlike(props.commentData.id)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        dispatch(getAllComments(eventData.id, pageId));
        emitter([props.commentData.username]);
      }
    });
  };

  return (
    <div className="event-card_dash m-0 mt-4">
      <div className="d-flex" id="card_header">
        <PopoverItem data={props.commentData.username}>
          <DisplayImage
            image={props.commentData.gravatarImage}
            imgClass="me-2 cursor-event"
            id="card-img"
          />
        </PopoverItem>
        <Username username={props.commentData.username} size={"sm"} />

        <div className="me-auto">
          <span className="card-timestamp text-muted align-self-center">
            {props.commentData.humanTimeDiffCreatedAt} ago
          </span>
        </div>

        <VerifiedRender>
          {currentUser === props.commentData.user ? (
            <CustomDropdown>
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
            </CustomDropdown>
          ) : (
            ""
          )}
        </VerifiedRender>
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

            <VerifiedRender>
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
            </VerifiedRender>
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
