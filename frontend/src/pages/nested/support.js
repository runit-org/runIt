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
import { FeedbackTypes } from "../../components/profile/helper/profileBuilder.js";
import * as ResponseStatus from "../../services/constants/responseStatus";

function Support() {
  const dispatch = useDispatch();
  const [load, setLoad] = useState(false);
  const { feedbackType, category } = FeedbackTypes();
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
    <>
      <div className="content">
        <Container className="content-wrapper">
          <div className="mx-4 col-md-8">
            <SectionHeader>Feedback & Support</SectionHeader>
            <hr />

            <Row className="my-4">
              <div className="col-md-4">
                <InfoCard
                  title="Events"
                  content={
                    <>
                      Learn how to create and manage events.
                      <Link className="d-block mt-2">Learn more</Link>
                    </>
                  }
                  cardStyle={{ backgroundColor: "#eaebfd" }}
                />
              </div>
              <div className="col-md-4">
                <InfoCard
                  title="Account Settings"
                  content={
                    <>
                      Learn how to manage your account.{" "}
                      <Link className="d-block mt-2">Learn more</Link>
                    </>
                  }
                  cardStyle={{ backgroundColor: "#eaebfd" }}
                />
              </div>
              <div className="col-md-4">
                <InfoCard
                  title="Security"
                  content={
                    <>
                      {" "}
                      How to reset password and verify your account.{" "}
                      <Link className="d-block mt-2">Learn more</Link>
                    </>
                  }
                  cardStyle={{ backgroundColor: "#eaebfd" }}
                />
              </div>
            </Row>
            <SectionHeader>Looking for something else?</SectionHeader>
            <div className="border p-4">
              {!success ? (
                <fieldset>
                  <Form
                    onSubmit={(e) => {
                      handleSubmit(e);
                    }}
                  >
                    <FormGroup formId="formBasicType" customStyle="col-md-6">
                      <FormLabel>Type</FormLabel>

                      <Form.Select
                        name="type"
                        onChange={handleFieldChange}
                        aria-label="Default select example"
                      >
                        <option>Type</option>
                        {feedbackType.map((item, i) => {
                          return (
                            <option key={i} value={item.value}>
                              {item.title}
                            </option>
                          );
                        })}
                      </Form.Select>
                    </FormGroup>
                    <FormGroup
                      formId="formBasicCategory"
                      customStyle="col-md-6"
                    >
                      <FormLabel>Category</FormLabel>

                      <Form.Select
                        name="category"
                        onChange={handleFieldChange}
                        aria-label="Default select example"
                      >
                        <option>Category</option>
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
                        name="details"
                        onChange={handleFieldChange}
                        required
                      />
                    </FormGroup>
                    <ResponseItem />
                    <CTAButton
                      type={"submit"}
                      btnStyle={"formBtn cta_button d-block mt-2"}
                      variant={"primary"}
                      isLoading={load}
                      placeholder={
                        <div className="d-flex align-items-center">Submit</div>
                      }
                    />
                  </Form>
                </fieldset>
              ) : (
                <>
                  <h4>Feedback Received</h4>
                  <span>
                    Thank you for getting in touch. We will respond shortly.
                  </span>
                </>
              )}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Support;
