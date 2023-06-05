import React, { useEffect } from "react";
import Item from "./list";
import styles from "./event.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getMany } from "store/reducers/event";

const Event = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getMany({ page: 1 }));
  }, [dispatch]);
  return (
    <div className={styles.event}>
      <div className={styles.banner}>
        <h1 className={styles.banner_title}>Promotion and Event</h1>
        <svg
          className={styles.scroll_down}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={() => {
            window.scrollTo(0, window.innerHeight);
          }}
        >
          <path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z" />
        </svg>
      </div>
      <div className={styles.container}>
        {list.map((item, index) => (
          <Item key={index} item={item} index={index} />
        ))}
      </div>
    </div>
  );
};

export default Event;
