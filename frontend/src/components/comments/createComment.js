import React, { useContext, useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import {
  createComment,
  getAllComments,
} from "../../services/actions/commentActions";
import { emitter } from "../client/socket";
import { SingleEventContext } from "../../pages/singleEventDash";
import CTAButton from "../../layouts/ctaButton";
import { MentionFilter } from "../../utilities/utility-service";
import { usePageId } from "../../hooks/usePageId";
import { UserContext } from "../../context/userProvider";
import { DisplayImage } from "../../layouts/userDisplayImg";
import * as ResponseStatus from "../../services/constants/responseStatus";

function CreateComment(props) {
  const dispatch = useDispatch();
  const formRef = useRef(0);
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [error, setError] = useState("");

  const eventData = useContext(SingleEventContext);
  const userContext = useContext(UserContext);

  let pageId = usePageId();

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
    dispatch(createComment(props.id, postData, setLoad, setError)).then(
      ({ status }) => {
        if (status === ResponseStatus.OK) {
          dispatch(getAllComments(props.id, pageId));
          emitter(MentionFilter(content, eventData.userName));
        }
      }
    );
  };

  useEffect(() => {
    if (error === ResponseStatus.OK) {
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
