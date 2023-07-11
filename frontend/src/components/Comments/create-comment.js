import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createComment, getAllComments } from "../../actions/commentActions";
import { emitter } from "../client/socket";
import { SingleEventContext } from "../Dashboards/event-dash";
import CTAButton from "../../layouts/cta-button";
import { MentionFilter } from "../Utilities/mention";
import { SearchParam } from "../Utilities/search-param";
import { UserContext } from "../Context/user-context";
import { DisplayImage } from "../../layouts/user-displayimg";

function CreateComment(props) {
  const dispatch = useDispatch();
  const formRef = useRef(0);
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [error, setError] = useState("");

  const eventData = useContext(SingleEventContext);
  const userContext = useContext(UserContext);

  let pageId = SearchParam();

  useEffect(() => {
    if (content === "") {
      setValidateFormEmpty(true);
    } else {
      setValidateFormEmpty(false);
    }
  }, [content]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      content: content,
    };
    dispatch(createComment(props.id, postData, setLoad, setError)).then(() => {
      dispatch(getAllComments(props.id, pageId));
      emitter(MentionFilter(content, eventData.userName));
    });
  };

  useEffect(() => {
    if (error === 200) {
      formRef.current.reset();
      setContent("");
      setError("");
    }
  }, [error]);
  return (
    <Card className="comment-card">
      <Card.Body>
        <Form
          onSubmit={(e) => {
            handleSubmit(e);
          }}
          ref={formRef}
        >
          <div className="d-flex justify-content-between">
            <DisplayImage
              image={userContext.currentUser.gravatarImage}
              imgClass="user-img me-3"
            />
            <Form.Control
              spellCheck={true}
              placeholder="Add a comment..."
              as="textarea"
              onChange={(e) => setContent(e.target.value)}
              rows={2}
              required
            />
          </div>

          <div className="d-flex justify-content-between mt-3">
            <small className="text-danger">{error}</small>
            <CTAButton
              type={"submit"}
              btnStyle={"formBtn cta_button"}
              variant={"primary"}
              formValidation={validateFormEmpty}
              isLoading={load}
              placeholder={
                <div className="d-flex align-items-center">Send</div>
              }
            />
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateComment;
