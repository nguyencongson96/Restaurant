import React from "react";
import { useSelector } from "react-redux";
import styles from "./List.module.css";

const Menu = () => {
  const list = useSelector((state) => state.products.filter.list);
  return (
    <div className={styles.section_center}>
      {list.map((menuItem, index) => {
        const { name, image, description, price } = menuItem;
        return (
          <article key={index} className={styles.menu_item}>
            <img src={image} alt={name} className={styles.photo} />
            <div className={styles.item_info}>
              <header>
                <h4 className={styles.name}>{name}</h4>
                <h4 className={styles.price}>${price}</h4>
              </header>
              <p className={styles.item_text}>{description}</p>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default Menu;
