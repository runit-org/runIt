import React from "react";
import { Container, Form, Row } from "react-bootstrap";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { ResponseItem } from "../../layouts/responseItems.js";
import { useHandleChange } from "../../hooks/useHandleChange.js";
import CTAButton from "../../layouts/ctaButton.js";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";
import { InfoCard } from "../../layouts/infoCards.js";
import { Link } from "react-router-dom";

function Support() {
  //   const dispatch = useDispatch();
  // const [load, setLoad] = useState(false);
  const { handleFieldChange } = useHandleChange({});

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
              <fieldset>
                <Form
                /*   onSubmit={(e) => {
                handleSubmit(e);
              }} */
                >
                  <FormGroup formId="formBasicType" customStyle="col-md-6">
                    <FormLabel>Type</FormLabel>

                    <Form.Select aria-label="Default select example">
                      <option>Type</option>
                      <option value="1">Support</option>
                      <option value="2">Feedback</option>
                    </Form.Select>
                  </FormGroup>
                  <FormGroup formId="formBasicCategory" customStyle="col-md-6">
                    <FormLabel>Category</FormLabel>

                    <Form.Select aria-label="Default select example">
                      <option>Category</option>
                      <option value="1">Event</option>
                      <option value="2">Comment</option>
                      <option value="3">Account</option>
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

                  <CTAButton
                    type={"submit"}
                    btnStyle={"formBtn cta_button"}
                    variant={"primary"}
                    placeholder={
                      <div className="d-flex align-items-center">Submit</div>
                    }
                  />
                  <ResponseItem />
                </Form>
              </fieldset>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Support;
