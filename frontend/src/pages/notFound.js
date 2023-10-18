import React from "react";
import { Link } from "react-router-dom";
import { POSTS, PROFILE, SETTINGS, SUPPORT } from "../routes/routes";

function NotFound() {
  return (
    <div className="not-found">
      <h1>Page Not Found</h1>
      <p>Whoops! That page doesn't exist.</p>
      <small className="d-block">Here are some helpful links instead:</small>
      <div className="d-flex gap-2 justify-content-center mt-2">
        <Link to={`/${POSTS}`} className="">
          Dashboard
        </Link>
        <Link to={`/${PROFILE}/${SETTINGS}?user=felixgoodman`}>Profile</Link>
        <Link to={`/${PROFILE}/${SUPPORT}?user=felixgoodman`}>Support</Link>
      </div>
    </div>
  );
}

export default NotFound;
