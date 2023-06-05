import React, { useEffect } from "react";
import { getMany } from "store/reducers/event";
import eventSlice from "store/reducers/event";
import { useSelector, useDispatch } from "react-redux";
import styles from "./event.module.css";
import { useNavigate } from "react-router-dom";

const EventList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, currentState } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(getMany({}));
  }, [dispatch]);

  const handleClick = (id) => {
    dispatch(eventSlice.actions.setCurrentState({ ...currentState, _id: id }));
    navigate("/admin/event/update");
  };

  return (
    <>
      <h1 className={styles.header}>Event List</h1>
      <div className={styles.list}>
        {list.map((item) => (
          <article key={item._id} className={styles.event_item} onClick={() => handleClick(item._id)}>
            <img className={styles.photo} src={item.image[0]} alt="" />
            <div className={styles.item_info}>
              <h4 className={styles.title}>
                <span className={styles.content}>{item.title}</span>
              </h4>
              <div className={styles.category}>
                <svg className={styles.icon} height="1em" viewBox="0 0 384 512">
                  <path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
                </svg>
                <span id={styles.category_label} className={styles.content}>
                  {item.category}
                </span>
              </div>
              <div className={styles.endAt}>
                <svg className={styles.icon} height="1em" viewBox="0 0 448 512">
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192h80v56H48V192zm0 104h80v64H48V296zm128 0h96v64H176V296zm144 0h80v64H320V296zm80-48H320V192h80v56zm0 160v40c0 8.8-7.2 16-16 16H320V408h80zm-128 0v56H176V408h96zm-144 0v56H64c-8.8 0-16-7.2-16-16V408h80zM272 248H176V192h96v56z" />
                </svg>
                <span className={styles.content}>
                  {item.beginAt.split("T")[0]} - {item.endAt.split("T")[0]}
                </span>
              </div>
              <div className={styles.location}>
                <svg className={styles.icon} height="1em" viewBox="0 0 384 512">
                  <path d="M384 192c0 87.4-117 243-168.3 307.2c-12.3 15.3-35.1 15.3-47.4 0C117 435 0 279.4 0 192C0 86 86 0 192 0S384 86 384 192z" />
                </svg>
                <span className={styles.content}>{item.location}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
};

export default EventList;
