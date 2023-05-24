import React, { useState } from "react";
import Menu from "./Menu";
import Categories from "./Categories.js";
import items from "./data";
import Video from "./video/Video.mp4";
// import Banner from "./banner/Banner";
import "./Menu.css";
// import Footer from "../footer/Footer";
const allCategories = ["all", ...new Set(items.map((item) => item.category))];

function Menupage() {
  const [menuItems, setMenuItems] = useState(items);
  const [categories] = useState(allCategories);

  const filterItems = (category) => {
    console.log("click", category);
    if (category === "all") {
      setMenuItems(items);
      return;
    }
    const newItems = items.filter((item) => item.category === category);
    setMenuItems(newItems);
  };

  return (
    <div className="main">
      {/* <Banner /> */}
      <div className="slogan-menu">
        <div className="slogan-menu-text">The best flavors from the bests.</div>
        <div className="sign">
          <div className="go-left"></div>
          <div className="slogan-menu-logo">Chef Huong</div>
          <div className="go-right"></div>
        </div>
      </div>
      <div className="menupage-vid">
        <video
          className="menupage-vid-mp"
          // src={
          //   "https://videos.files.wordpress.com/BeEMT13l/pexels-taryn-elliott-7172269.mp4?fbclid=IwAR2VeYSrzVltGvSIOyCWYgDUAGZoDLx2QvYMCuCGilV1d9L-DFvHY9B4evg"
          // }
          src={Video}
          autoPlay
          loop
          muted
        >
          <div className="menupage-vid-text">FOOD CRAFT. AT ITS BEST.</div>
        </video>
      </div>
      <section className="menupage section">
        <div className="title">
          <div className="title-name">Our Menu</div>
          <div className="underline" />
        </div>
        <Categories categories={categories} filterItems={filterItems} />
        <Menu items={menuItems} />
      </section>
    </div>
  );
}

export default Menupage;
