import React from "react";
import { Link } from "react-router-dom";
import styles from "./resNav.module.css";

const ResNav = (props) => {
  const { showReversePage } = props;
  return (
    <div className={styles.res_nav}>
      <Link to="/menu" style={{ color: "#d2ae68", margin: " 0 auto" }}>
        Menu
      </Link>
      <Link to="/event" style={{ color: "#d2ae68", margin: " 0 auto" }}>
        Event
      </Link>
      <Link to="/about-us" style={{ color: "#d2ae68", margin: " 0 auto" }}>
        About Us
      </Link>
      <div
        onClick={showReversePage}
        style={{ color: "#d2ae68", margin: " 0 auto" }}
        className={styles.res_reverse}
      >
        Reservation
      </div>
    </div>
  );
};

export default ResNav;
