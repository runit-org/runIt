import React, { useContext, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import CTAButton from "../../layouts/ctaButton";
import { Cross, Submit } from "../../layouts/icons";
import { useHandleChange } from "../../hooks/useHandleChange";
import { updateDetails } from "../../services/actions/userActions";
import { UserContext } from "../../context/userProvider";
import { useNavigate } from "react-router-dom";
import { ResponseItem } from "../../layouts/responseItems";
import { OK } from "../../services/constants/responseStatus";

function UpdateDetails(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [load, setLoad] = useState(false);
  const { currentUser } = useContext(UserContext);
  const { formValue, handleFieldChange } = useHandleChange({
    username: currentUser.username,
    message: currentUser.email,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(updateDetails(formValue, setLoad)).then(({ status }) => {
      if (status === OK) {
        navigate(`/`);
      }
    });
  };

  return (
    <Form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <>
        <div>
          <h5 className="fw-bold mb-2">Edit Profile</h5>
        </div>
        <ResponseItem />
        <Form.Group className="mb-2">
          <Form.Label className="text-muted small">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            placeholder={formValue.username}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label className="text-muted small">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder={formValue.email}
            onChange={handleFieldChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-between mt-3">
          <CTAButton
            type={""}
            btnStyle={"postBtn-placements"}
            variant={"primary"}
            onClick={props.toggleEditor}
            placeholder={
              <div className="d-flex align-items-center">
                <Cross />
                Cancel
              </div>
            }
          />
          <CTAButton
            type={"submit"}
            btnStyle={"postBtn-placements cta_button"}
            variant={"primary"}
            isLoading={""}
            placeholder={
              <div className="d-flex align-items-center">
                {load ? (
                  "saving..."
                ) : (
                  <>
                    {" "}
                    <Submit />
                    Save
                  </>
                )}
              </div>
            }
          />
        </div>
      </>
    </Form>
  );
}

export default UpdateDetails;
