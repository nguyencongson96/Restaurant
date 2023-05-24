import React from "react";
import textSplit from "../../utils/textSplit";
import styles from "./Main.module.css";
import ScrollEvent from "../../utils/ScrollEvent";
import Carousell from "../../components/carousell/Carousell";
import { MainDish } from "./MainDish";
import { MainPromo } from "./MainPromo";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Main = () => {
  const { name, phone, location, description } = useSelector((state) => state.infos.detail);
  const ranLocation = location[Math.floor(Math.random() * location.length)];
  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainbanner}>
          <div className={styles.logo}> {name} </div>
          <div className={styles.ad}> {ranLocation}</div>
          <div className={styles.ad}>Tel: {phone}</div>
          <div className={styles.line}>
            <div className={`${styles.dash} ${styles.left}`}></div>
            <svg className={styles.star} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M0 256C0 114.6 114.6 0 256 0c33 0 64.6 6.3 93.6 17.7c7.4 2.9 11.5 10.7 9.8 18.4s-8.8 13-16.7 12.4c-4.8-.3-9.7-.5-14.6-.5c-114.9 0-208 93.1-208 208s93.1 208 208 208c4.9 0 9.8-.2 14.6-.5c7.9-.5 15 4.7 16.7 12.4s-2.4 15.5-9.8 18.4C320.6 505.7 289 512 256 512C114.6 512 0 397.4 0 256zM375.4 137.4c3.5-7.1 13.7-7.1 17.2 0l31.5 63.8c1.4 2.8 4.1 4.8 7.2 5.3l70.4 10.2c7.9 1.1 11 10.8 5.3 16.4l-50.9 49.6c-2.3 2.2-3.3 5.4-2.8 8.5l12 70.1c1.3 7.8-6.9 13.8-13.9 10.1l-63-33.1c-2.8-1.5-6.1-1.5-8.9 0l-63 33.1c-7 3.7-15.3-2.3-13.9-10.1l12-70.1c.5-3.1-.5-6.3-2.8-8.5L261 233.1c-5.7-5.6-2.6-15.2 5.3-16.4l70.4-10.2c3.1-.5 5.8-2.4 7.2-5.3l31.5-63.8z" />
            </svg>
            <div className={`${styles.dash} ${styles.right}`}></div>
          </div>
          <button
            className={styles.btn}
            onClick={() => {
              window.scrollTo(0, window.innerHeight);
            }}
          >
            See More
          </button>
        </div>
      </div>

      <div className={styles.about}>
        <span className={styles.about_title_menu}>Our Story</span>
        <div className={styles.about_img}></div>
        <div className={styles.about_des}>{description}</div>
      </div>

      <div className={styles.menu}>
        <Carousell BannerData={MainDish} />
        <div className={styles.menu_des}>
          <div className={`${styles.menu_title} ${ScrollEvent(0.9) ? "spin-char" : ""} `}>
            {textSplit("Inspiration", "char")}
          </div>
          <div className={`${styles.menu_text} ${ScrollEvent(0.9) ? "spin-word" : ""}`}>
            {textSplit(
              "Our creative, food and beverage program combines satisfying staples with imaginative twists. From boozy drag show brunches, classic Americana breakfasts, special occasions and everything in between, SONA has something for everyone...",
              "word"
            )}
          </div>
          <button className={`${styles.menu_btn} ${ScrollEvent(0.9) ? "spin-360" : ""}`}>
            <Link to="/Menu">See Our Menu</Link>
          </button>
        </div>
      </div>

      <div className={styles.menu}>
        <div className={styles.menu_des}>
          <div className={`${styles.menu_title} ${ScrollEvent(2) ? "spin-char" : ""}`}>
            {textSplit("Happenings", "char")}
          </div>
          <div className={`${styles.menu_text} ${ScrollEvent(2) ? "spin-word" : ""}`}>
            {textSplit(
              "From seasonal menus to Holiday Celebrations, find out what's going on at SONA!",
              "word"
            )}
          </div>
          <button className={`${styles.menu_btn} ${ScrollEvent(2) ? "spin-360" : ""}`}>
            <Link to="/Promotion">View Happenings</Link>
          </button>
        </div>
        <Carousell BannerData={MainPromo} />
      </div>

      <div className={styles.map}>
        <div className={`${styles.map_info} ${ScrollEvent(3) ? "spin-360" : ""}`}>
          <div className={styles.map_name}>{name}</div>
          <div className={styles.map_des}>{ranLocation}</div>
        </div>
      </div>
    </>
  );
};

export default Main;
