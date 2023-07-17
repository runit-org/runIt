import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../services/actions/securityActions";
import { Logout } from "../../layouts/icons";
import { DisplayImage } from "../../layouts/user-displayimg";
import { getCurrentUserProfile } from "../../services/actions/userActions";

function SingleClick() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currUserProfile, setCurrUserProfile] = useState({});

  const handleLogout = (e) => {
    e.preventDefault();
    const token = Cookies.get("token");

    const refToken = {
      refresh: token,
    };

    dispatch(logout(refToken, navigate));
  };

  // get current user
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
  }, [currProfile, navigate]);

  return (
    <>
      {currUserProfile ? (
        <Card className="current-signedin" style={{ width: "24rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item className="p-0">
              <Link to="/posts">
                <div className="d-flex align-items-center userInfo-div p-3">
                  <DisplayImage image={currUserProfile.gravatarImage} />
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
                  <Logout />
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

export default SingleClick;
