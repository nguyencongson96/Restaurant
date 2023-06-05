import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getDistrictList } from "../../../store/reducers/general";
import styles from "./info.module.css";

const LocationInput = (props) => {
  const { index, stateValue, cityList, handleChange } = props;
  const item = stateValue[index];
  const dispatch = useDispatch();
  const [list, setList] = useState([item.district]);

  useEffect(() => {
    dispatch(getDistrictList(item.city)).then((data) => {
      setList(data.payload);
      [...stateValue].splice(index, 1, { ...item, city: item.city, district: data.payload[0] });
      handleChange("location", stateValue);
    });
  }, [dispatch, item.city]);

  return cityList.length > 0 ? (
    <div className={styles.location}>
      <input
        className={`${styles.input} ${styles.detail_location}`}
        type="text"
        value={item.detail}
        onChange={(e) => {
          stateValue.splice(index, 1, { ...item, detail: e.target.value });
          handleChange("location", stateValue);
        }}
      />
      <select
        className={`${styles.input} ${styles.district}`}
        defaultValue={item.district}
        onChange={(e) => {
          stateValue.splice(index, 1, { ...item, district: e.target.value });
          handleChange("location", stateValue);
        }}
      >
        {list.map((district) => (
          <option key={`${item._id}.${district}`} value={district}>
            {district}
          </option>
        ))}
      </select>
      <select
        className={`${styles.input} ${styles.city}`}
        defaultValue={item.city}
        onChange={(e) => {
          stateValue.splice(index, 1, { ...item, city: e.target.value });
          handleChange("location", stateValue);
        }}
      >
        {cityList.map((city) => (
          <option key={city}>{city}</option>
        ))}
      </select>
    </div>
  ) : (
    <div className={styles.location} />
  );
};

export default LocationInput;
