import React from "react";
import { Link } from "react-router-dom";
import "./ResNav.css";

const ResNav = (props) => {
  const { showReversePage } = props;
  return (
    <div className="res-nav">
      <Link to="/Menu" style={{ color: "#d2ae68", margin: " 0 auto" }}>
        Menu
      </Link>
      <Link to="/Promotion" style={{ color: "#d2ae68", margin: " 0 auto" }}>
        Promo
      </Link>
      <Link to="/AboutUs" style={{ color: "#d2ae68", margin: " 0 auto" }}>
        About Us
      </Link>
      <div onClick={showReversePage} style={{ color: "#d2ae68", margin: " 0 auto" }} className="res-reverse">
        Reservation
      </div>
    </div>
  );
};

export default ResNav;
