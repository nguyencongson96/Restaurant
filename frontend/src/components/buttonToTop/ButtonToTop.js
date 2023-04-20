import React, { useState } from "react";
import "./ButtonToTop.css";

const ButtonToTop = () => {
  const [toTopShow, setToTopShow] = useState(false);
  const onScroll = () => setToTopShow(window.pageYOffset > 0 ? true : false);
  window.addEventListener("scroll", onScroll);
  return (
    <svg
      className={`btn-top ${toTopShow && "show-up"}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      onClick={() => {
        window.scrollTo(0, 0);
      }}
    >
      <path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z" />
    </svg>
  );
};

export default ButtonToTop;
