import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getOneByAdmin, updateByAdmin } from "store/reducers/reservation";
import { getInfo } from "store/reducers/info";
import styles from "./reservation.module.css";
import reservationsSlice from "store/reducers/reservation";

const Update = () => {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.reservations);
  const { location } = useSelector((state) => state.infos.detail);
  const id = current._id;

  useEffect(() => {
    id && dispatch(getOneByAdmin(id));
    dispatch(getInfo({ detail: 0 }));
  }, [dispatch, id]);

  function handleChange(e) {
    const key = e.target.name;
    const newCurrent = { ...current, [key]: e.target.value };
    dispatch(reservationsSlice.actions.changeCurrent(newCurrent));
  }
  function handleSubmit() {
    dispatch(updateByAdmin(current));
  }

  return (
    <>
      <h1 className={styles.header}>Reservation Information</h1>
      <div className={styles.detail}>
        <div className={styles.item}>
          <label>Booking Name:</label>
          <input
            className={styles.input}
            type="text"
            value={current.bookingName}
            name="bookingName"
            onChange={handleChange}
          />
        </div>
        <div className={styles.item}>
          <label>Phone Number:</label>
          <input
            className={styles.input}
            type="text"
            value={current.phone}
            name="phone"
            onChange={handleChange}
          />
        </div>
        <div className={styles.item}>
          <label>Location:</label>
          <select
            id="location"
            className={styles.input}
            value={current.locationId}
            name="location"
            onChange={handleChange}
          >
            <option value="Default" hidden>
              Choose your location
            </option>
            {location.map((item, index) => (
              <option key={index} value={item._id}>
                {item.summary}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.item}>
          <label>Number of People:</label>
          <input
            type="number"
            className={styles.input}
            name="numberOfPeople"
            value={current.numberOfPeople}
            min="0"
            onChange={handleChange}
          />
        </div>
        <div className={styles.item}>
          <label>Date:</label>
          <input
            className={styles.input}
            type="date"
            id={styles.date}
            value={current.date.split("T")[0]}
            name="date"
            onChange={handleChange}
          />
          <label className={styles.time_label}>Time:</label>
          <input
            className={styles.input}
            type="time"
            id="time"
            value={current.time}
            name="time"
            onChange={handleChange}
          />
        </div>
      </div>
      <button className={styles.btn} onClick={handleSubmit}>
        Update
      </button>
    </>
  );
};

export default Update;
