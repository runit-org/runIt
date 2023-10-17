import React, { useState } from "react";
import { Container, Form, Row } from "react-bootstrap";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { ResponseItem } from "../../layouts/responseItems.js";
import { useHandleChange } from "../../hooks/useHandleChange.js";
import CTAButton from "../../layouts/ctaButton.js";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";
import { InfoCard } from "../../layouts/infoCards.js";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { feedback } from "../../services/actions/userActions.js";
import {
  FeedbackTypes,
  SupportObj,
} from "../../components/profile/helper/profileBuilder.js";
import * as ResponseStatus from "../../services/constants/responseStatus";

function Support() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { feedbackType, category } = FeedbackTypes();
  const { support } = SupportObj();

  const [success, setSuccess] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    type: "",
    category: "",
    details: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(feedback(formValue, setLoad)).then(({ status }) => {
      if (status === ResponseStatus.OK) {
        setSuccess(true);
      }
    });
  };

  return (
    <div className="content">
      <Container className="content-wrapper">
        <div className="mx-4 col-md-8">
          <SectionHeader>Feedback & Support</SectionHeader>
          <small className="text-muted d-block ms-1">
            Browse through our Help Center articles
          </small>
          <hr />
          <Row className="mt-2 mb-4 row-gap-2">
            {support.map((item, i) => {
              return (
                <div className="col-md-4" key={i}>
                  <InfoCard
                    title={
                      <span className="m-0 fw-semibold">{item.title}</span>
                    }
                    content={
                      <>
                        <small>{item.content}</small>
                        <span className="d-block mt-4">
                          <Link
                            className="d-block position-absolute bottom-0"
                            to={item.route}
                          >
                            Learn more
                          </Link>
                        </span>
                      </>
                    }
                    cardStyle={{ backgroundColor: "#eaebfd", height: "100%" }}
                  />
                </div>
              );
            })}
          </Row>
          <SectionHeader>Looking for something else?</SectionHeader>
          <div className="border p-4 rounded-2">
            {!success ? (
              <fieldset>
                <Form
                  onSubmit={(e) => {
                    handleSubmit(e);
                  }}
                >
                  <FormGroup formId="formBasicType" customStyle="col-md-6">
                    <FormLabel>Topic</FormLabel>
                    <Form.Select
                      name="type"
                      onChange={handleFieldChange}
                      aria-label="Default select example"
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Select a topic
                      </option>
                      {feedbackType.map((item, i) => {
                        return (
                          <option key={i} value={item.value}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FormGroup>
                  <FormGroup formId="formBasicCategory" customStyle="col-md-6">
                    <FormLabel>Category</FormLabel>
                    <Form.Select
                      name="category"
                      onChange={handleFieldChange}
                      aria-label="Default select example"
                      defaultValue={"DEFAULT"}
                    >
                      <option value="DEFAULT" disabled>
                        Select a category
                      </option>
                      {category.map((item, i) => {
                        return (
                          <option key={i} value={item.value}>
                            {item.title}
                          </option>
                        );
                      })}
                    </Form.Select>
                  </FormGroup>
                  <FormGroup formId="formBasicDetails">
                    <FormLabel>Details</FormLabel>
                    <Form.Control
                      type="details"
                      as="textarea"
                      placeholder="Describe the issue..."
                      name="details"
                      onChange={handleFieldChange}
                      required
                    />
                    <small className="d-block mb-2 mt-1">
                      Share your feedback to enhance runit or report a bug to
                      help us improve!
                    </small>
                  </FormGroup>
                  <ResponseItem />
                  <CTAButton
                    type={"submit"}
                    btnStyle={"formBtn cta_button d-block mt-2"}
                    variant={"primary"}
                    isLoading={load}
                    placeholder={
                      <div className="d-flex align-items-center">Send</div>
                    }
                  />
                </Form>
              </fieldset>
            ) : (
              <>
                <h4>Feedback received</h4>
                <span>
                  Thank you for getting in touch. We will respond shortly.
                </span>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Support;
