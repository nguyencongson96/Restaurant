import React from "react";
import { useState, useEffect } from "react";
import "./Carousell.css";

const Carousell = (props) => {
  const { BannerData } = props;
  const [imgIndex, setImgindex] = useState(0);
  useEffect(() => {
    const timerImg = setInterval(() => {
      setImgindex((prev) => (prev === BannerData.length - 1 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(timerImg);
  }, [BannerData.length]);
  console.log(imgIndex);

  return (
    <div className="banner">
      {/* <div className="bannermenu">MENU</div> */}
      {BannerData.map((item) => {
        return <img key={item.id} src={item.img} alt="no" className={item.id === imgIndex ? "pic main-pic" : "pic"} />;
      })}
    </div>
  );
};

export default Carousell;
