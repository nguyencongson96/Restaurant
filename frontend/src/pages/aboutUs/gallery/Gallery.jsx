import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styles from "./gallery.module.css";

const Gallery = () => {
  const imgList = useSelector((state) => state.infos.detail.image);
  const [imgIndex, setImgIndex] = useState(0);
  const imgLength = imgList.length;

  useEffect(() => {
    const timer = setTimeout(() => setImgIndex(imgIndex === imgLength - 1 ? 0 : imgIndex + 1), 3000);
    return () => clearTimeout(timer);
  }, [imgIndex, imgLength]);

  return (
    <div className={styles.container}>
      <div className={styles.title}>Gallery</div>
      <div className={styles.underline} />
      <div className={styles.gallery}>
        <div className={styles.carousel}>
          {imgList.map((item, index) => (
            <img
              key={index}
              src={item}
              className={`${styles.img}
              ${
                index === imgIndex
                  ? styles.active
                  : imgIndex === 0 && index === 2
                  ? ""
                  : index <= imgIndex - 2 || index >= imgIndex + 2
                  ? styles.hide
                  : ""
              }`}
              alt=""
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
