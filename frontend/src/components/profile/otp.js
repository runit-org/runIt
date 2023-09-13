import React, { useState } from "react";
import { Alert, Button } from "react-bootstrap";
import CTAButton from "../../layouts/ctaButton";

function Otp() {
  const [show, setShow] = useState(true);
  /*   const dispatch = useDispatch();
  const logout = useHandleLogout();
  const [load, setLoad] = useState(false);
  const { formValue, handleFieldChange } = useHandleChange({
    current_password: "",
    password: "",
    c_password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePassword(formValue, setLoad)).then((res) => {
      if (res.status === ResponseStatus.OK) {
        logout(e);
      }
    });
  }; */

  return (
    <>
      <Alert show={show} variant="primary">
        <h6>Verify your account</h6>
        <small>Verify your account to gain uninterrupted access.</small>

        <CTAButton
          type={"submit"}
          btnStyle={"formBtn cta_button mt-3 d-block"}
          variant={"primary"}
          // isLoading={load}
          placeholder={<div className="d-flex align-items-center">Verify</div>}
        />
      </Alert>

      {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>}
    </>
  );
}

export default Otp;
