import React, { useRef, useState } from "react";
import ModalItem from "../Event/modal-item";
import { Button, Form } from "react-bootstrap";
import { Loading } from "../../layouts/loader";
import { useDispatch } from "react-redux";
import { getCurrentUserProfile, userStatus } from "../../actions/userActions";
import { Smiley } from "../../layouts/icons";

function UserStatus() {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const postData = {
      message: message,
    };
    dispatch(userStatus(postData, setLoad, setError)).then(() => {
      dispatch(getCurrentUserProfile());
    });
  };

  return (
    <>
      <ModalItem
        ref={(ref, btnRef)}
        customBtn={"w-100 btn-muted text-start"}
        btnIcon={
          <>
            <Smiley />
            <span className="ms-1">Set status...</span>
          </>
        }
        error={error.success === "false" ? error : ""}
        title={"Edit Status"}
        content={
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="What's happening?"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>
        }
        subBtn={
          <div className="mt-3">
            <Button
              type="submit"
              onClick={() => btnRef.current.setModalShow(false)}
            >
              {(() => {
                if (load) {
                  return <Loading />;
                } else {
                  return <>Set Status</>;
                }
              })()}
            </Button>
            <Button
              className="me-3 btn-cancel"
              onClick={() => btnRef.current.setModalShow(false)}
            >
              Clear Status
            </Button>
          </div>
        }
        subHandler={handleSubmit}
      />
    </>
  );
}

export default UserStatus;
