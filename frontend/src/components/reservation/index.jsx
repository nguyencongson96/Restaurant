import React, { useState } from "react";
import styles from "./reservation.module.css";
import { useSelector, useDispatch } from "react-redux";
import reservationsSlice from "../../store/reducers/reservation";
import Form from "./form";
import Search from "./search";

const Reservation = () => {
  const { isShow } = useSelector((state) => state.reservations);
  const { setShow } = reservationsSlice.actions;
  const [isActiveForm, setIsActiveForm] = useState(true);
  const dispatch = useDispatch();

  function handleClose() {
    dispatch(setShow());
  }

  function handleActiveForm() {
    setIsActiveForm(!isActiveForm);
  }

  return (
    <div className={`${styles.booking} ${isShow ? styles.show : ""}`}>
      {isShow && (
        <div className={styles.form}>
          <h3 className={styles.header}>Reservations</h3>
          <div className={styles.sub_header}>
            <h4 className={isActiveForm ? styles.active : ""} onClick={handleActiveForm}>
              Form
            </h4>
            <h4 className={isActiveForm ? "" : styles.active} onClick={handleActiveForm}>
              Search
            </h4>
          </div>
          {isActiveForm ? <Form /> : <Search />}
        </div>
      )}

      <span className={styles.close_form} onClick={handleClose}>
        x
      </span>
    </div>
  );
};

export default Reservation;
