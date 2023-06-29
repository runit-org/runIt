import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CTAButton from "../../layouts/cta-button";
import { getAllComments, updateComment } from "../../actions/commentActions";
import { SearchParam } from "../Utilities/search-param";
import { emitter } from "../client/socket";
import { MentionFilter } from "../Utilities/mention";
import { Cross, Submit } from "../../layouts/icons";

function UpdateComment(props, { handleUpate }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(props.content);

  let pageId = SearchParam();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      content: content,
    };

    dispatch(updateComment(props.commentId, postData)).then(() => {
      dispatch(getAllComments(props.eventId, pageId));
      emitter(MentionFilter(content));
    });
    props.handleUpate();
  };

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <Card className={props.cardStyle}>
        <Card.Header>
          <h3 className="fw-bold m-0">Edit comment</h3>
        </Card.Header>
        <Card.Body>
          <Form.Control
            spellCheck={true}
            placeholder="What's on your mind?"
            as="textarea"
            value={content || ""}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <div className="d-flex justify-content-between mt-3">
            <CTAButton
              type={""}
              btnStyle={"postBtn-placements"}
              variant={"primary"}
              onClick={props.handleUpate}
              placeholder={
                <div className="d-flex align-items-center">
                  <Cross />
                  Cancel
                </div>
              }
            />
            <CTAButton
              type={"submit"}
              btnStyle={"postBtn-placements cta_button"}
              variant={"primary"}
              formValidation={content === "" ? true : false}
              isLoading={""}
              placeholder={
                <div className="d-flex align-items-center">
                  <Submit />
                  Update
                </div>
              }
            />
          </div>
        </Card.Body>
      </Card>{" "}
    </Form>
  );
}

export default UpdateComment;
