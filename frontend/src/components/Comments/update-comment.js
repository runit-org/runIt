import React, { useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CTAButton from "../SiteElements/cta-button";
import { getAllComments, updateComment } from "../../actions/commentActions";
import { SearchParam } from "../Utilities/search-param";

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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                    className="me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
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
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="20"
                    height="20"
                    className="me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                    />
                  </svg>
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
