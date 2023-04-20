import React from "react";
import textSplit from "../../function/textSplit";
import "./Main.css";
import ScrollEvent from "../../function/ScrollEvent";
import Carousell from "./carousell/Carousell";
import { MainDish } from "./MainDish";
import { MainPromo } from "./MainPromo";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div>
      <div className="bg-container">
        <div className="mainbanner">
          <div className="mainbanner-logo"> Sona </div>
          <div className="mainbanner-ad"> Tay Ho, Hoan Kiem, Ha Noi</div>
          <div className="mainbanner-ad">Tel +84 223 1997</div>
          <div className="mainbanner-line">
            <div className="dash left"></div>
            <svg
              className="star"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M0 256C0 114.6 114.6 0 256 0c33 0 64.6 6.3 93.6 17.7c7.4 2.9 11.5 10.7 9.8 18.4s-8.8 13-16.7 12.4c-4.8-.3-9.7-.5-14.6-.5c-114.9 0-208 93.1-208 208s93.1 208 208 208c4.9 0 9.8-.2 14.6-.5c7.9-.5 15 4.7 16.7 12.4s-2.4 15.5-9.8 18.4C320.6 505.7 289 512 256 512C114.6 512 0 397.4 0 256zM375.4 137.4c3.5-7.1 13.7-7.1 17.2 0l31.5 63.8c1.4 2.8 4.1 4.8 7.2 5.3l70.4 10.2c7.9 1.1 11 10.8 5.3 16.4l-50.9 49.6c-2.3 2.2-3.3 5.4-2.8 8.5l12 70.1c1.3 7.8-6.9 13.8-13.9 10.1l-63-33.1c-2.8-1.5-6.1-1.5-8.9 0l-63 33.1c-7 3.7-15.3-2.3-13.9-10.1l12-70.1c.5-3.1-.5-6.3-2.8-8.5L261 233.1c-5.7-5.6-2.6-15.2 5.3-16.4l70.4-10.2c3.1-.5 5.8-2.4 7.2-5.3l31.5-63.8z" />
            </svg>
            <div className="dash right"></div>
          </div>
          <button
            className="mainbanner-btn"
            onClick={() => {
              window.scrollTo(0, window.innerHeight);
            }}
          >
            See More
          </button>
        </div>
      </div>
      <div className="about">
        <span className="about-title-menu">Our Story</span>
        <div className="about-img"></div>
        <div className="about-des">
          SONA - where the quintessence of multi-sensory cuisine resonates in
          the space with a view of the West Lake from above. Immerse yourself in
          the liberal interference of culinary art and the natural picture of
          West Lake, enjoy the wonderful feeling of delicate dishes and drinks
          in the heart of Hanoi.
        </div>
        {/* <button>See More</button> */}
      </div>

      <div className="menu">
        {/* <img
          className="menu-img"
          src="https://images.getbento.com/accounts/65e1fe01d2241d86184cbee4f6645488/media/images/21908REIGN_RESTAURANT_RICK_OBRIEN_MR22-81.jpg?w=1200&fit=max&auto=compress,format"
          alt="food"
        ></img> */}
        <Carousell BannerData={MainDish} />

        <div className="menu-des">
          <div className={`menu-title ${ScrollEvent(0.9) ? "spin-char" : ""} `}>
            {textSplit("Inspiration", "char")}
          </div>
          <div className={`menu-text ${ScrollEvent(0.9) ? "spin-word" : ""}`}>
            {textSplit(
              "Our creative, food and beverage program combines satisfying staples with imaginative twists. From boozy drag show brunches, classic Americana breakfasts, special occasions and everything in between, SONA has something for everyone...",
              "word"
            )}
          </div>
          <button className={`menu-btn ${ScrollEvent(0.9) ? "spin-360" : ""}`}>
            <Link to="/Menu" className="ohoho">
              See Our Menu
            </Link>
            {/* See Our Menu */}
          </button>
        </div>
      </div>

      <div className="menu second-me">
        <div className="menu-des">
          <div className={`menu-title ${ScrollEvent(2) ? "spin-char" : ""}`}>
            {textSplit("Happenings", "char")}
          </div>
          <div className={`menu-text ${ScrollEvent(2) ? "spin-word" : ""}`}>
            {textSplit(
              "From seasonal menus to Holiday Celebrations, find out what's going on at SONA!",
              "word"
            )}
          </div>
          <button className={`menu-btn ${ScrollEvent(2) ? "spin-360" : ""}`}>
            <Link to="/Promotion" className="ohoho">
              View Happenings
            </Link>
          </button>
        </div>
        {/* <img
          className="menu-img"
          src="https://resizer.otstatic.com/v2/photos/wide-huge/1/24743311.jpg"
          alt="food"
        ></img> */}
        <Carousell BannerData={MainPromo} />
      </div>
      <div className="map">
        <div className={`map-info ${ScrollEvent(3) ? "spin-360" : ""}`}>
          <div className="map-name">SONA</div>
          <div className="map-des">Xuan Dieu, Tay Ho, Viet Nam</div>
        </div>
      </div>
    </div>
  );
};

export default Main;
