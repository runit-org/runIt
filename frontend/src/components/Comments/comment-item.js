import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import { Mention } from "../Utilities/mention";
import { commentOptions } from "./utilities/comment-options";
import UpdateComment from "./update-comment";
import { getAllComments, likeUnlike } from "../../actions/commentActions";
import { SearchParam } from "../Utilities/search-param";
import PopoverItem from "../Profile/popover-item";
import { CommentReacts } from "./utilities/comment-builder";

function CommentItem(props) {
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState();
  const [editorMode, setEditorMode] = useState(false);

  let pageId = SearchParam();

  var getCurrentUser = useSelector(
    (securityReducer) => securityReducer.security.user
  );

  useEffect(() => {
    if (getCurrentUser != null) {
      setCurrentUser(getCurrentUser.user_id);
    }
  }, [getCurrentUser]);

  function handleClick() {
    setEditorMode(!editorMode);
  }

  const commentReact = () => {
    dispatch(likeUnlike(props.commentData.id)).then(() => {
      dispatch(getAllComments(props.eventData.id, pageId));
    });
  };

  return (
    <>
      {!editorMode ? (
        <Card className="event-card">
          <Card.Header>
            <div className="d-flex">
              <img
                src={props.commentData.gravatarImage}
                className="userProf-img me-3"
                alt="Img"
              />

              <div className="me-auto">
                <h6 className="fw-bold m-0"> {props.commentData.username}</h6>
                <small
                  className="text-muted"
                  style={{ fontSize: "12px", display: "block" }}
                >
                  <PopoverItem data={props.commentData.username} />

                  <strong>
                    {" "}
                    {props.commentData.humanTimeDiffCreatedAt} ago
                  </strong>
                </small>
              </div>

              {currentUser === props.commentData.user ? (
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    size="sm"
                    id="dropdown-basic"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      width="24"
                      height="24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                      />
                    </svg>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {commentOptions(
                      props.commentData.id,
                      props.eventData.id,
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
          </Card.Header>
          <Card.Body>
            <Card.Text
              className="details_textarea"
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
                className="postBtn-placements cta_button"
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
          eventId={props.eventData.id}
          commentId={props.commentData.id}
          content={props.commentData.content}
          cardStyle={currentUser === props.eventData.user ? "editor-card" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default CommentItem;
