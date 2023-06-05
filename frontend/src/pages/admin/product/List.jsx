import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "store/reducers/product";
import productSlice from "store/reducers/product";
import styles from "./product.module.css";
import { useNavigate } from "react-router-dom";

const List = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const list = useSelector((state) => state.products.totalList);

  useEffect(() => {
    dispatch(getProduct({}));
  }, [dispatch]);

  function handleClick(index) {
    dispatch(productSlice.actions.setCurrentState(list[index]));
    navigate("/admin/product/update");
  }

  return (
    <>
      <h1 className={styles.header}>Product List</h1>
      <div className={styles.list}>
        {list.map((menuItem, index) => {
          const { name, image, description, price } = menuItem;
          return (
            <article key={index} className={styles.menu_item} onClick={() => handleClick(index)}>
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
    </>
  );
};

export default List;
