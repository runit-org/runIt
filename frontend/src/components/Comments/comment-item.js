import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { Button, ButtonGroup, Card, Dropdown } from "react-bootstrap";
import { Mention } from "../Utilities/mention";
import { commentOptions } from "./utilities/comment-options";
import UpdateComment from "./update-comment";
import { getAllComments, likeUnlike } from "../../actions/commentActions";
import { SearchParam } from "../Utilities/search-param";
import PopoverItem from "../Profile/popover-item";
import { CommentReacts } from "./utilities/comment-builder";
import { SingleEventContext } from "../Dashboards/event-dash";
import { SecurityContext } from "../Context/security-context";
import { Ellipse } from "../SiteElements/icons";

function CommentItem(props) {
  const dispatch = useDispatch();

  const [editorMode, setEditorMode] = useState(false);
  const eventData = useContext(SingleEventContext);
  const currentUser = useContext(SecurityContext);

  let pageId = SearchParam();

  function handleClick() {
    setEditorMode(!editorMode);
  }

  const commentReact = () => {
    dispatch(likeUnlike(props.commentData.id)).then(() => {
      dispatch(getAllComments(eventData.id, pageId));
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
          eventId={eventData.id}
          commentId={props.commentData.id}
          content={props.commentData.content}
          cardStyle={currentUser === eventData.user ? "editor-card" : ""}
          handleUpate={handleClick}
        />
      )}
    </>
  );
}

export default CommentItem;
