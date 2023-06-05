import React from "react";
import styles from "./about.module.css";
import { useSelector } from "react-redux";

const About = () => {
  const { description } = useSelector((state) => state.infos.detail);

  return (
    <div className={styles.about}>
      <span className={styles.about_title_menu}>Our Story</span>
      <div className={styles.about_img}></div>
      <div className={styles.about_des}>{description}</div>
    </div>
  );
};

export default About;
