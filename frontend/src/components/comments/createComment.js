import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import { DisplayImage } from "../../layouts/user/userDisplayImg";
import * as ResponseStatus from "../../services/constants/responseStatus";
import { ResponseItem } from "../../layouts/responseItems";
import { useHandleChange } from "../../hooks/useHandleChange";
import TaggingDropdown from "./taggingDropdown";

function CreateComment(props) {
  const initialState = {
    content: "",
  };

  const dispatch = useDispatch();
  const formRef = useRef(0);
  let pageId = usePageId();
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const { eventData } = useContext(SingleEventContext);
  const userContext = useContext(UserContext);
  const { formValue, setFormValue, handleFieldChange } =
    useHandleChange(initialState);

  //handle tags from dropdown

  const handleCommentChange = useCallback(
    (newComment) => {
      setFormValue((prevFormValue) => {
        return {
          ...prevFormValue,
          content: newComment,
        };
      });
    },
    [setFormValue]
  );

  //validate form
  useEffect(() => {
    if (formValue.content === "") {
      setValidateFormEmpty(true);
    } else {
      setValidateFormEmpty(false);
    }
  }, [formValue]);

  //submit comment logic
  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      ...formValue,
      content: formValue.content,
    };
    dispatch(createComment(props.id, postData, setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        formRef.current.reset();
        setFormValue(initialState);
        dispatch(getAllComments(props.id, pageId));
        emitter(MentionFilter(postData.content, eventData.userName));
      }
    });
  };

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
              name="content"
              spellCheck={true}
              placeholder="Add a comment..."
              as="textarea"
              value={
                Object.keys(formValue.content).length !== 0
                  ? formValue.content
                  : ""
              }
              onChange={handleFieldChange}
              rows={2}
              required
            />
          </div>
          <ResponseItem />
          <div className="d-flex justify-content-between mt-3">
            <TaggingDropdown
              onCommentChange={handleCommentChange}
              formValue={formValue.content}
              identifier="@"
            />
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
