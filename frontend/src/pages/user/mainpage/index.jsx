import React from "react";
import { useSelector } from "react-redux";
import MainBanner from "./mainbanner";
import About from "./about";
import Menu from "./menu";
import Map from "./map";
import styles from "./Main.module.css";

const Main = () => {
  const { location } = useSelector((state) => state.infos.detail);
  const ranLocation = location[Math.floor(Math.random() * location.length)]?.summary;
  return (
    <div className={styles.main}>
      <MainBanner location={ranLocation} />
      <About />
      <Menu />
      <Map location={ranLocation} />
    </div>
  );
};

export default Main;
