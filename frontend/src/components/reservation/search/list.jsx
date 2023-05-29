import React from "react";
import styles from "./search.module.css";

const List = (props) => {
  const { list } = props;
  return (
    <ul className={styles.list}>
      {list.map((item) => (
        <li key={item._id} className={styles.item}>
          <div className={styles.name}>Booking Name: {item.bookingName}</div>
          <div className={styles.number}>
            Number: {item.numberOfPeople} {Number(item.numberOfPeople) > 1 ? "people" : "person"}
            <div className={styles.date}>
              Date: {item.time} - {new Intl.DateTimeFormat("en-GB").format(new Date(item.date))}
            </div>
          </div>
          <div className={styles.location}>Location: {item.location}</div>
        </li>
      ))}
    </ul>
  );
};

export default List;
