import React from "react";
import { Card, Container, Form, Row } from "react-bootstrap";
import { SectionHeader } from "../../layouts/sectionHeader.js";
import { ResponseItem } from "../../layouts/responseItems.js";
import { useHandleChange } from "../../hooks/useHandleChange.js";
import CTAButton from "../../layouts/ctaButton.js";
import { FormGroup, FormLabel } from "../../layouts/customForm.js";

function Support() {
  //   const dispatch = useDispatch();
  // const [load, setLoad] = useState(false);
  const { handleFieldChange } = useHandleChange({});

  return (
    <>
      <div className="content">
        <Container className="content-wrapper">
          <div className="mx-4 col-md-8">
            <SectionHeader size={"sm"}>Feedback & Support</SectionHeader>
            <hr />

            <Row className="my-4">
              <div className="col-md-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Events</Card.Title>
                    <Card.Text className="text-muted">
                      Learn how to create and manage events.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Account Settings</Card.Title>
                    <Card.Text className="text-muted ">
                      Learn how to manage your account.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
              <div className="col-md-4">
                <Card>
                  <Card.Body>
                    <Card.Title>Security</Card.Title>
                    <Card.Text className="text-muted">
                      How to reset password and verify your account.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            </Row>
            <SectionHeader size={"sm"}>
              Looking for something else?
            </SectionHeader>
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
                      <option value="1">One</option>
                      <option value="2">Two</option>
                      <option value="3">Three</option>
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
