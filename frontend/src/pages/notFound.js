import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Page Not Found</h1>
      <p>Whoops! That page doesn't exist.</p>
      <small className="d-block">Here are some helpful links instead:</small>
      <div className="d-flex gap-2 justify-content-center mt-2">
        <Link to="/posts" className="">
          Dashboard
        </Link>
        <Link to="/profile/settings?user=felixgoodman">Profile</Link>
        <Link to="/profile/feedback-support?user=felixgoodman">Support</Link>
      </div>
    </div>
  );
}

export default NotFound;
