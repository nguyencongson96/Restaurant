import React from "react";
import styles from "./Map.module.css";
import ScrollEvent from "utils/ScrollEvent";
import { useSelector } from "react-redux";

const Map = (props) => {
  const { name } = useSelector((state) => state.infos.detail);
  const { location } = props;
  return (
    <div className={styles.map}>
      <div className={`${styles.map_info} ${ScrollEvent(3) ? styles.spin_360 : ""}`}>
        <div className={styles.map_name}>{name}</div>
        <div className={styles.map_des}>{location}</div>
      </div>
    </div>
  );
};

export default Map;
