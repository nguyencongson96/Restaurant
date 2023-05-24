import React, { useEffect, useState } from "react";
import "./Gallery.css";

const Gallery = ({ AboutUsImg }) => {
  const [imgIndex, setImgIndex] = useState(0);
  const imgLength = AboutUsImg.length;
  const prevImg = () => {
    imgIndex > 0 ? setImgIndex(imgIndex - 1) : setImgIndex(imgLength - 1);
  };
  const nextImg = () => {
    imgIndex === imgLength - 1 ? setImgIndex(0) : setImgIndex(imgIndex + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => setImgIndex(imgIndex === imgLength - 1 ? 0 : imgIndex + 1), 2000);
    return () => clearTimeout(timer);
  }, [imgIndex, imgLength]);

  return (
    <div className="gallery">
      <div className="btn btn-prev" onClick={prevImg}>
        &#8249;
      </div>
      <div className="carousel">
        {AboutUsImg.map((item) => {
          return (
            <img
              key={item.id}
              src={item.img}
              className={
                item.id === imgIndex
                  ? "banner-img img-active"
                  : imgIndex === 0 && item.id === 2
                  ? "banner-img"
                  : item.id <= imgIndex - 2 || item.id >= imgIndex + 2
                  ? "banner-img banner-hide"
                  : "banner-img"
              }
              alt=""
            />
          );
        })}
      </div>
      <div className="btn btn-next" onClick={nextImg}>
        &#8250;
      </div>
    </div>
  );
};

export default Gallery;
