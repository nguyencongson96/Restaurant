import React, { useEffect } from "react";
import styles from "./menu.module.css";
import ScrollEvent from "utils/ScrollEvent";
import textSplit from "utils/textSplit";
import Carousell from "components/carousell/Carousell";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "store/reducers/product/index";

const Menu = () => {
  const dispatch = useDispatch();
  const { promo, product } = useSelector((state) => {
    return { promo: state.infos.detail.image, product: state.products.totalList.map((item) => item.image) };
  });

  useEffect(() => {
    dispatch(getProduct({ random: 6, field: "image" }));
  }, [dispatch]);

  return (
    <>
      <div className={styles.menu}>
        <Carousell BannerData={product} />
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
        <Carousell BannerData={promo} />
      </div>
    </>
  );
};

export default Menu;
