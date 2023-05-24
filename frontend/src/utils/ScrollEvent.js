import { useState } from "react";

const ScrollEvent = (pageToScroll) => {
  const [point, setPoint] = useState(false);
  const onScroll = () => {
    const pointToScroll = pageToScroll * window.innerHeight;
    setPoint(window.pageYOffset > pointToScroll ? true : false);
  };
  window.addEventListener("scroll", onScroll);
  return point;
};

export default ScrollEvent;
