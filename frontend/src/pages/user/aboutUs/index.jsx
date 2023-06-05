import React from "react";
import styles from "./aboutUs.module.css";
import Gallery from "./gallery/Gallery";

const AboutUs = () => {
  return (
    <div className={styles.aboutUs}>
      <div className={styles.banner}>
        <img
          src="https://www.sgcookinglessons.com/wp-content/uploads/2017/05/Fine-Dining-Background.jpg"
          alt=""
        />
        <p>About Us</p>
      </div>

      <div className={styles.desc}>
        {/* <div className={styles.desc_in}>
          <p className={styles.line_one}>
            Bracing the chaos of the roads, you will find yourself lost in a charming courtyard house in
            Hanoi.
          </p>
          <div className={styles.line_two}>
            <p>
              Blowing your mind with artfully-presented and extraordinary dishes you possibly have never seen,
              Sona is an award-winning restaurant inspired by the Indochine style and mostly serves European
              cuisine.
            </p>
            <p>
              The restaurant offers typical dishes from France, and Italy, and also some fusion dishes,
              especially the ones with local Vietnamese food.
            </p>
          </div>
        </div> */}
        <div className={styles.main}>
          <div className={styles.main_text}>
            <p className={styles.chef}>The Chefs</p>
            <p className={styles.chef_text}>
              We started Sona as a way to honor our family traditions while pursuing our own passions. In
              addition to being brother and sister, we are fourth generation chefs with a strong dedication to
              making the most significant traditions relevant again
            </p>
            <p className={styles.chef_text}>
              We have spent countless hours in this kitchen developing and perfecting the recipes you see on
              the menu today. We have also dedicated our time and energy into sourcing the right ingredients
              and making sure seasonal specialities are available to our patrons.
            </p>
          </div>
          <div className={styles.card_list}>
            <div className={styles.card}>
              <span className={styles.caption}>
                <h2>Chef Huong</h2>
                <p className={styles.des_info}>
                  A native Hanoian, Executive Chef Huong Nguyen grew up surrounded by the cuisine and culture
                  of the North Viet Nam. After ventures across the country, including several years staying in
                  the Middle and the South of Viet Nam, Huong returned to Hanoi in 2020. Upon his return,
                  Huong immersed himself in the flourishing culinary scene, gaining experience at some of the
                  city's top restaurants, including Sona.
                </p>
              </span>
              <img
                src="https://img.freepik.com/premium-photo/crop-faceless-shot-male-chef-uniform-putting-cut-pieces-celery-content-smoothie_222464-1147.jpg?w=2000"
                alt=""
              />
            </div>
            <div className={styles.card}>
              <span className={styles.caption}>
                <h2>Chef Son</h2>
                <p className={styles.des_info}>
                  Though Chef Son is one of the world's most famous chefs, his skills extend far beyond the
                  kitchen. A savvy businessman and restaurateur, Son is responsible for the operation and
                  success of 9 restaurants in Hanoi.
                </p>
              </span>
              <img
                src="https://img.freepik.com/premium-photo/crop-faceless-shot-male-chef-uniform-putting-cut-pieces-celery-content-smoothie_222464-1147.jpg?w=2000"
                alt=""
              />
            </div>
          </div>
        </div>
        <Gallery />
      </div>
    </div>
  );
};

export default AboutUs;
