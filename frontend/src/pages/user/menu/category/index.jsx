import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productSlice from "store/reducers/product";
import styles from "./category.module.css";

const Categories = () => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(0);
  const { totalList } = useSelector((state) => state.products);
  const allCategories = ["all", ...new Set(totalList.map((item) => item.category))];

  const handleCategoryClick = (category, newIndex) => {
    dispatch(productSlice.actions.setCategory(category));
    setActive(newIndex);
  };

  return (
    <div className={styles.container}>
      {allCategories.map((category, index) => (
        <button
          type="button"
          className={`${styles.filter} ${index === active ? styles.active : ""}`}
          key={index}
          onClick={() => handleCategoryClick(category, index)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
