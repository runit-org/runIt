import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../actions/securityActions";
import { Logout } from "../SiteElements/icons";
import { DisplayImage } from "../SiteElements/user-displayimg";

function SingleClick(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      {props.currUserProfile ? (
        <Card className="current-signedin" style={{ width: "24rem" }}>
          <ListGroup variant="flush">
            <ListGroup.Item className="p-0">
              <Link to="/posts">
                <div className="d-flex align-items-center userInfo-div p-3">
                  <DisplayImage image={props.currUserProfile.gravatarImage} />
                  <div className="ms-3">
                    <strong>{props.currUserProfile.username}</strong>
                    <small className="d-block text-muted">
                      {props.currUserProfile.email}
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
