import React, { useContext, useRef, useState } from "react";
import ModalItem from "../../layouts/modalItem";
import { Button, Form } from "react-bootstrap";
import { Loading } from "../../layouts/loader";
import { useDispatch } from "react-redux";
import {
  getCurrentUserProfile,
  userStatus,
} from "../../services/actions/userActions";
import { Smiley } from "../../layouts/icons";
import { UserContext } from "../../context/userProvider";

function UserStatus() {
  const dispatch = useDispatch();
  const ref = React.createRef();
  const btnRef = useRef();
  const { currentUser } = useContext(UserContext);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState({});
  const [message, setMessage] = useState(
    currentUser && currentUser.statusMessage
      ? currentUser.statusMessage
      : "What's happening?"
  );

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
    <ModalItem
      ref={(ref, btnRef)}
      customBtn={"w-100 btn-muted text-start"}
      btnIcon={
        <span className="d-grid">
          <span className="ms-1 text-truncate" style={{ maxWidth: "100%" }}>
            <Smiley />
            {currentUser.statusMessage}
          </span>
        </span>
      }
      title={"Edit Status"}
      error={error}
    >
      <Form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <div className="mt-3">
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder={currentUser.statusMessage}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="mt-3">
          <Button type="submit" onClick={() => btnRef.current.setModalShow()}>
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
            onClick={() => btnRef.current.setModalShow()}
          >
            Cancel
          </Button>
        </div>
      </Form>
    </ModalItem>
  );
}

export default UserStatus;
