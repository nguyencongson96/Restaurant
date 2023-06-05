import React, { useEffect } from "react";
import Menu from "./menuList";
import Categories from "./category";
import Video from "./video/Video.mp4";
import styles from "./Menu.module.css";
import { useDispatch } from "react-redux";
import { getProduct } from "store/reducers/product";
import productSlice from "store/reducers/product";

function Menupage() {
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(getProduct({ field: "name,category,price,description,image" }));
      await dispatch(productSlice.actions.setCategory("all"));
    })();
  }, [dispatch]);

  return (
    <div className={styles.main}>
      <div className={styles.slogan_menu}>
        <div className={styles.slogan_menu_text}>The best flavors from the bests.</div>
        <div className={styles.sign}>
          <span className={styles.go_left} />
          <span className={styles.slogan_menu_logo}>Chef Huong</span>
          <span className={styles.go_right} />
        </div>
      </div>
      <div className={styles.vid}>
        <video className={styles.vid_mp} src={Video} autoPlay loop muted />
      </div>
      <section className={`${styles.menupage} ${styles.section}`}>
        <div className={styles.title}>
          <div className={styles.title_name}>Our Menu</div>
          <div className={styles.underline} />
        </div>
        <Categories />
        <Menu />
      </section>
    </div>
  );
}

export default Menupage;
