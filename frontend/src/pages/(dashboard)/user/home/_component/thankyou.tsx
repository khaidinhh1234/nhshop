import React from "react";
import { Link } from "react-router-dom";

const ThankyouPage = () => {
  return (
    <div className="container text-center">
      <h1>Thankyou</h1>
      <Link to={"/"} className="btn - btn-outline-secondary">
        Quay về trang chủ{" "}
      </Link>
    </div>
  );
};

export default ThankyouPage;
