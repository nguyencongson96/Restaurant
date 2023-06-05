import React from "react";
import styles from "./form.module.css";
import { useSelector, useDispatch } from "react-redux";
import reservationsSlice, { addNewByUser } from "../../../store/reducers/reservation";

const Form = () => {
  const { current } = useSelector((state) => state.reservations);
  const { location } = useSelector((state) => state.infos.detail);
  const { changeCurrent } = reservationsSlice.actions;
  const dispatch = useDispatch();

  function handleChange(e) {
    const key = e.target.name;
    const newCurrent = { ...current, [key]: e.target.value };
    dispatch(changeCurrent(newCurrent));
  }

  function handleFormatDate(value) {
    return new Intl.DateTimeFormat("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      timeZone: "Asia/Jakarta",
    }).format(new Date(value));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    dispatch(addNewByUser(current));
  }

  return (
    <>
      <div className={styles.content}>
        <div className={`${styles.item} ${styles.name}`}>
          <label>Full Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            className={styles.input}
            value={current.name}
            onChange={handleChange}
            name="bookingName"
          />
        </div>
        <div className={`${styles.item} ${styles.phone}`}>
          <label>Phone Number</label>
          <input
            type="text"
            placeholder="Enter your phone number"
            className={styles.input}
            value={current.phone}
            onChange={handleChange}
            name="phone"
          />
        </div>
        <div className={`${styles.item} ${styles.location}`}>
          <label htmlFor="location">Location:</label>
          <select
            id="location"
            className={styles.input}
            value={current.location}
            onChange={handleChange}
            name="locationId"
          >
            <option hidden value="Default">
              Choose a location
            </option>
            {location.map((item, index) => (
              <option key={index} value={item._id}>
                {item.summary}
              </option>
            ))}
          </select>
        </div>
        <div className={`${styles.item} ${styles.number}`}>
          <label htmlFor="number">Number of people:</label>
          <input
            type="number"
            id="number"
            className={styles.input}
            value={current.numberOfPeople}
            onChange={handleChange}
            name="numberOfPeople"
            min={1}
            max={10}
          />
        </div>
        <div className={styles.dateTime}>
          <div className={`${styles.item} ${styles.date}`}>
            <label htmlFor="date">Date:</label>
            <input
              className={styles.input}
              type="date"
              id="date"
              min={handleFormatDate(Date.now())}
              max={handleFormatDate(Date.now() + 3 * 24 * 60 * 60 * 1000)}
              value={current.date}
              onChange={handleChange}
              name="date"
            />
          </div>
          <div className={`${styles.item} ${styles.time}`}>
            <label htmlFor="time">Time:</label>
            <input
              className={styles.input}
              type="time"
              id="time"
              value={current.time}
              onChange={handleChange}
              name="time"
            />
          </div>
        </div>
      </div>
      <button className={styles.submit} onClick={handleSubmit}>
        Book a Table
      </button>
      <div className={styles.note}>Note: We only accept reservation for at most 3 days from now</div>
    </>
  );
};

export default Form;
