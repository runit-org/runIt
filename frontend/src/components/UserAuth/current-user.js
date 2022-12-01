import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/securityActions";
import { getCurrentUserProfile } from "../../actions/userActions";

function CurrentUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currUserProfile, setCurrUserProfile] = useState({});

  useEffect(() => {
    dispatch(getCurrentUserProfile());
  }, [dispatch]);

  var currProfile = useSelector(
    (securityReducer) => securityReducer.users.currProfile
  );

  useEffect(() => {
    if (currProfile) {
      setCurrUserProfile(currProfile.data);
    }
  }, [currProfile]);

  const handleLogout = (e) => {
    e.preventDefault();
    const token = localStorage.token;

    const refToken = {
      refresh: token,
    };

    dispatch(logout(refToken, navigate));
  };

  return (
    <>
      {currUserProfile ? (
        <Card className="current-signedin" style={{ width: "24rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item className="p-0">
              <Link to="/posts">
                <div className="d-flex align-items-center userInfo-div p-3">
                  <img
                    src={currUserProfile.gravatarImage}
                    className="userProf-img"
                    alt="use profile"
                  />
                  <div className="ms-3">
                    <strong>{currUserProfile.username}</strong>
                    <small className="d-block text-muted">
                      {currUserProfile.email}
                    </small>
                  </div>
                </div>
              </Link>
            </ListGroup.Item>
            <ListGroup.Item className="p-0">
              <Link
                onClick={(e) => {
                  handleLogout(e);
                }}
                to="#"
              >
                <div className="p-3 text-muted">
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    width="24"
                    height="24"
                    className="me-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                    />
                  </svg>
                  Logout
                </div>
              </Link>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      ) : (
        ""
      )}
    </>
  );
}

export default CurrentUser;
