import React from "react";
import { useState, useEffect } from "react";
import styles from "./Carousell.module.css";

const Carousell = (props) => {
  const { BannerData } = props;
  const [imgIndex, setImgindex] = useState(0);

  useEffect(() => {
    const timerImg = setInterval(() => {
      setImgindex((prev) => (prev === BannerData.length - 1 ? 0 : prev + 1));
    }, 7000);
    return () => clearInterval(timerImg);
  }, [BannerData.length]);

  return (
    <div className={styles.banner}>
      {BannerData.map((item, index) => (
        <img
          key={index}
          src={item}
          alt="no"
          className={`${styles.pic} ${index === imgIndex ? styles.main_pic : ""}`}
        />
      ))}
    </div>
  );
};

export default Carousell;
