import React from "react";
import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div className="main-content-div faq-page-background">
      <div className="col-md-6 m-auto">
        <h3>umm...what?</h3>
        <p styles={{ textAlign: "center" }}>
          Looks like something went wrong
          <br />
          Sorry about that. Maybe
          <br />
          again try later?
        </p>
        <Link to="/">
          <button
            type="button"
            className="btn btn-primary btn-sm default-btn-purple"
          >
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
};
export default NotFoundPage;
