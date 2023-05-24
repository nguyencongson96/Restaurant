import React, { useEffect } from "react";
import styles from "./Footer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getInfo } from "../../store/reducers/info";

const Footer = () => {
  const dispatch = useDispatch();
  const { name, phone, email, time, location } = useSelector((state) => state.infos.detail);

  useEffect(() => {
    dispatch(getInfo({ detail: 0, field: [] }));
  }, [dispatch]);

  return (
    <div className={styles.footer}>
      <h5 className={styles.item}>
        <div className={styles.title}>Address</div>
        <div className={styles.content}>
          <ul className={styles.address}>
            {location &&
              location.map((item, index) => (
                <li key={index}>
                  CS{index + 1}: {item}
                </li>
              ))}
          </ul>
        </div>
      </h5>
      <h5 className={styles.item}>
        <div className={styles.title}>Open Time</div>
        <div className={styles.content}>{time && time.join(" & ")}</div>
      </h5>
      <h5 className={styles.item}>
        <div className={styles.title}>Contact</div>
        <div className={styles.content}>
          <div className={styles.phone}>{phone}</div>
          <div className={styles.email}>{email}</div>
          <div className={styles.name}>@{name}</div>
        </div>
      </h5>
    </div>
  );
};

export default Footer;
