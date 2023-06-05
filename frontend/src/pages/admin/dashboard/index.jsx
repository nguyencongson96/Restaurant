import React from "react";
import styles from "./dashboard.module.css";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "store/reducers/info";

const iconList = {
  add: (
    <svg className={styles.icon} viewBox="0 0 448 512">
      <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
    </svg>
  ),

  update: (
    <svg className={styles.icon} viewBox="0 0 512 512">
      <path d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
    </svg>
  ),

  get: (
    <svg className={styles.icon} viewBox="0 0 460 512">
      <path d="M220.6 130.3l-67.2 28.2V43.2L98.7 233.5l54.7-24.2v130.3l67.2-209.3zm-83.2-96.7l-1.3 4.7-15.2 52.9C80.6 106.7 52 145.8 52 191.5c0 52.3 34.3 95.9 83.4 105.5v53.6C57.5 340.1 0 272.4 0 191.6c0-80.5 59.8-147.2 137.4-158zm311.4 447.2c-11.2 11.2-23.1 12.3-28.6 10.5-5.4-1.8-27.1-19.9-60.4-44.4-33.3-24.6-33.6-35.7-43-56.7-9.4-20.9-30.4-42.6-57.5-52.4l-9.7-14.7c-24.7 16.9-53 26.9-81.3 28.7l2.1-6.6 15.9-49.5c46.5-11.9 80.9-54 80.9-104.2 0-54.5-38.4-102.1-96-107.1V32.3C254.4 37.4 320 106.8 320 191.6c0 33.6-11.2 64.7-29 90.4l14.6 9.6c9.8 27.1 31.5 48 52.4 57.4s32.2 9.7 56.8 43c24.6 33.2 42.7 54.9 44.5 60.3s.7 17.3-10.5 28.5zm-9.9-17.9c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z" />
    </svg>
  ),
};

const dashboardObj = [
  {
    title: "Information",
    sub_content: [{ subTitle: "Update", link: "/admin/info" }],
  },
  {
    title: "Product",
    sub_content: [
      { subTitle: "Add", link: "/admin/product/add" },
      { subTitle: "Update", link: "/admin/product/list" },
    ],
  },
  {
    title: "Reservation",
    sub_content: [{ subTitle: "Update", link: "/admin/reservation/list" }],
  },
  {
    title: "Event",
    sub_content: [
      { subTitle: "Add", link: "/admin/event/add" },
      { subTitle: "Update", link: "/admin/event/list" },
    ],
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();

  return (
    <div className={styles.dashboard}>
      <h1 className={styles.header}>Dashboard</h1>
      <div className={styles.content}>
        {dashboardObj.map((item, index) => {
          const { title, sub_content } = item;
          return (
            <div key={index}>
              <div className={styles.title}>{title}</div>
              {sub_content.map((sub_item, index) => {
                const foundIcon = Object.keys(iconList).find((item) =>
                  sub_item.subTitle.toLowerCase().includes(item)
                );
                return (
                  <NavLink
                    to={sub_item.link}
                    key={index}
                    className={({ isActive, isPending }) => (isActive ? styles.active : "")}
                    id={styles.sub_content}
                  >
                    {iconList[foundIcon]}
                    <span>{sub_item.subTitle}</span>
                  </NavLink>
                );
              })}
            </div>
          );
        })}
      </div>
      <NavLink className={styles.sign_out} onClick={() => dispatch(logOut())}>
        <svg className={styles.icon} viewBox="0 0 512 512">
          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
        </svg>
        <span>Sign Out</span>
      </NavLink>
    </div>
  );
};

export default Dashboard;
