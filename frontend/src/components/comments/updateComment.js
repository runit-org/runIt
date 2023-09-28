import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CTAButton from "../../layouts/ctaButton";
import {
  getAllComments,
  updateComment,
} from "../../services/actions/commentActions";
import { usePageId } from "../../hooks/usePageId";
import { emitter } from "../client/socket";
import { MentionFilter } from "../../utilities/utility-service";
import { Cross } from "../../layouts/icons";
import * as ResponseStatus from "../../services/constants/responseStatus";

function UpdateComment(props, { handleUpate }) {
  const dispatch = useDispatch();
  const [content, setContent] = useState(props.content);

  let pageId = usePageId();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      content: content,
    };

    dispatch(updateComment(props.commentId, postData)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        dispatch(getAllComments(props.eventId, pageId));
        emitter(MentionFilter(content));
      }
    });
    props.handleUpate();
  };

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className="w-100"
    >
      <Card className="editor-card">
        <Card.Header>
          <h6 className="fw-bold m-0">Edit comment</h6>
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
              btnStyle={"formBtn cta_button"}
              variant={"primary"}
              formValidation={content === "" ? true : false}
              isLoading={""}
              placeholder={
                <div className="d-flex align-items-center">Update</div>
              }
            />
          </div>
        </Card.Body>
      </Card>
    </Form>
  );
}

export default UpdateComment;
