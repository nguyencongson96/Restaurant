import React, { useState } from "react";
import styles from "./search.module.css";
import { useSelector, useDispatch } from "react-redux";
import { getMany } from "../../../store/reducers/reservation";
import List from "./list";

const Search = () => {
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.reservations);
  const [phone, setPhone] = useState("");

  function handleChange(e) {
    setPhone(e.target.value);
  }

  function handleClick(e) {
    e.preventDefault();
    dispatch(getMany({ phone }));
  }

  return (
    <form onSubmit={handleClick}>
      <div className={styles.search}>
        <input
          id="phone"
          required
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={handleChange}
          onSubmit={handleClick}
        />
        <svg className={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
          <path d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z" />
        </svg>
      </div>
      <List list={list} />
    </form>
  );
};

export default Search;
