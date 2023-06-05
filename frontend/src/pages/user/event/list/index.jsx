import React, { useState } from "react";
import styles from "./item.module.css";

const Item = (props) => {
  const [showTime, setShowTime] = useState(false);
  const { title, image, category, description, endAt } = props.item;
  const isEven = props.index % 2 !== 0 ? styles.reverse : "";
  const formatEndAt =
    endAt === ""
      ? endAt
      : Intl.DateTimeFormat("vi-VN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        }).format(new Date(endAt));

  const currentTime = new Date(),
    timeLeft = Math.max(
      0,
      new Date(endAt) - currentTime + currentTime.getTimezoneOffset() * 60 * 1000 + 24 * 60 * 60 * 1000 - 1
    ),
    dayLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24)),
    hourLeft = Math.ceil(timeLeft / (1000 * 60 * 60) - dayLeft * 24);

  return (
    <div className={`${styles.item} ${isEven}`}>
      <div className={styles.img}>
        <div className={`${styles.expire_date} ${isEven}`}>{formatEndAt}</div>
        <img src={image} alt="event" />
      </div>
      <div className={`${styles.text} ${isEven}`}>
        <h1 className={styles.header}>{category}</h1>
        <h2 className={styles.title}>{title}</h2>
        <p className={`${styles.des} ${isEven}`}>{description}</p>
        <div className={`${styles.time} ${isEven}`} onClick={() => setShowTime(!showTime)}>
          <span className={showTime ? styles.active : ""}>
            {timeLeft === 0 ? "Event expired" : `Time left: ${dayLeft} days ${hourLeft} hours`}
          </span>
          <span className={showTime ? "" : styles.active}>End At: {formatEndAt}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
