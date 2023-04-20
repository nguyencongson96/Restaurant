import React, { useEffect, useState } from "react";
import "./Banner.css";
import { bannerData } from "./menudata";

const Banner = () => {
  const [imgIndex, setImgindex] = useState(0);
  useEffect(() => {
    const timerImg = setInterval(() => {
      setImgindex((prev) => (prev === bannerData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timerImg);
  }, []);
  return (
    <div className="banner">
      {/* <div className="bannermenu">MENU</div> */}
      {bannerData.map((item) => {
        return (
          <img
            key={item.id}
            src={item.img}
            alt="no"
            className={item.id === imgIndex ? "pic main-pic" : "pic"}
          />
        );
      })}
    </div>
  );
};

export default Banner;
