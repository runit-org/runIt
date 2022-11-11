import React, { useEffect, useRef, useState } from "react";
import { Card, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createComment } from "../../actions/commentActions";
import CTAButton from "../SiteElements/cta-button";

function CreateComment(props) {
  const dispatch = useDispatch();
  const formRef = useRef(0);
  const [content, setContent] = useState("");
  const [load, setLoad] = useState(false);
  const [validateFormEmpty, setValidateFormEmpty] = useState(false);
  const [error, setError] = useState("");

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
      //  dispatch(getAllEvents(pageId));
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
    <>
      <Card className="event-card">
        <Card.Body>
          <Form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
            ref={formRef}
          >
            <Form.Control
              placeholder="What's on your mind?"
              as="textarea"
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              required
            />
            <div className="d-flex justify-content-end mt-3">
              {/* <small className="text-danger">{error}</small> */}
              <CTAButton
                type={"submit"}
                btnStyle={"postBtn-placements cta_button"}
                variant={"primary"}
                formValidation={validateFormEmpty}
                isLoading={load}
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
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                      />
                    </svg>
                  </div>
                }
              />
            </div>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
}

export default CreateComment;
