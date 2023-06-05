import React, { useEffect } from "react";
import { addNew, updateOne, getOne, deleteOne } from "store/reducers/event";
import { useDispatch, useSelector } from "react-redux";
import eventSlice from "store/reducers/event";
import styles from "./event.module.css";
import { getInfo } from "store/reducers/info";
import { useNavigate } from "react-router-dom";

const Info = (props) => {
  const { type } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentState } = useSelector((state) => state.events);
  const id = currentState._id;
  const { location } = useSelector((state) => state.infos.detail);
  const { setCurrentState } = eventSlice.actions;

  useEffect(() => {
    dispatch(getInfo({ detail: 0 }));
    id && dispatch(getOne(id));
    type === "add" &&
      dispatch(
        eventSlice.actions.setCurrentState({
          _id: "",
          title: "",
          category: "",
          description: "",
          image: [""],
          locationId: "",
          beginAt: "",
          endAt: "",
        })
      );
  }, [dispatch, type, id]);

  function handleChange(e, index) {
    const key = e.target.name;
    switch (key) {
      case "image":
        const newImgArr = [...currentState.image];
        newImgArr.splice(index, 1, e.target.value);
        return dispatch(setCurrentState({ ...currentState, [key]: newImgArr }));

      default:
        return dispatch(setCurrentState({ ...currentState, [key]: e.target.value }));
    }
  }

  function handleAddImage() {
    dispatch(setCurrentState({ ...currentState, image: [...currentState.image, ""] }));
  }

  function handleRemoveImage(index) {
    const newImgArr = [...currentState.image];
    newImgArr.splice(index, 1);
    return dispatch(setCurrentState({ ...currentState, image: newImgArr }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (type === "add") {
      const currentStateCopy = { ...currentState };
      delete currentStateCopy._id;
      dispatch(addNew(currentStateCopy));
    } else dispatch(updateOne(currentState));
    navigate("/admin/event/list");
  }

  function handleRemove() {
    dispatch(deleteOne(currentState._id));
    dispatch(
      eventSlice.actions.setCurrentState({
        _id: "",
        title: "",
        category: "",
        description: "",
        image: [""],
        locationId: "",
        beginAt: "",
        endAt: "",
      })
    );
    navigate("/admin/event/list");
  }

  return (
    <>
      <h1 className={styles.header}>Event Information</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div id={styles.title_category} className={styles.item}>
          <label htmlFor="description">Title:</label>
          <div id={styles.title}>
            <input
              name="title"
              id="title"
              className={styles.input}
              value={currentState.title}
              onChange={handleChange}
            />
          </div>
          <div id={styles.category}>
            <label id={styles.category_label} htmlFor="category">
              Category:{" "}
            </label>
            <select
              name="category"
              id="category"
              className={styles.input}
              value={currentState.category}
              onChange={handleChange}
            >
              <option hidden> Choose category</option>
              {["event", "promotion", "highlight"].map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div id={styles.description} className={styles.item}>
          <label htmlFor="description">Description:</label>
          <textarea
            rows={3}
            name="description"
            id="description"
            className={styles.input}
            value={currentState.description}
            placeholder="Write something"
            onChange={handleChange}
          />
        </div>
        <div id={styles.image} className={styles.item}>
          <label htmlFor={styles.image}>Image: </label>
          <div className={styles.image_input}>
            {currentState.image.map((item, index) => (
              <div key={index} className={styles.image_item}>
                <input
                  type="url"
                  id={styles.image}
                  className={styles.input}
                  name="image"
                  value={item}
                  onChange={(e) => handleChange(e, index)}
                />
                <svg
                  className={styles.remove_image}
                  onClick={() => handleRemoveImage(index)}
                  height="1em"
                  viewBox="0 0 448 512"
                >
                  <path d="M170.5 51.6L151.5 80h145l-19-28.4c-1.5-2.2-4-3.6-6.7-3.6H177.1c-2.7 0-5.2 1.3-6.7 3.6zm147-26.6L354.2 80H368h48 8c13.3 0 24 10.7 24 24s-10.7 24-24 24h-8V432c0 44.2-35.8 80-80 80H112c-44.2 0-80-35.8-80-80V128H24c-13.3 0-24-10.7-24-24S10.7 80 24 80h8H80 93.8l36.7-55.1C140.9 9.4 158.4 0 177.1 0h93.7c18.7 0 36.2 9.4 46.6 24.9zM80 128V432c0 17.7 14.3 32 32 32H336c17.7 0 32-14.3 32-32V128H80zm80 64V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16zm80 0V400c0 8.8-7.2 16-16 16s-16-7.2-16-16V192c0-8.8 7.2-16 16-16s16 7.2 16 16z" />
                </svg>
              </div>
            ))}
            <button type="button" onClick={handleAddImage} className={styles.btn_image}>
              Add more
            </button>
          </div>
        </div>
        <div id={styles.time} className={styles.item}>
          <label>Duration: </label>
          <input
            name="beginAt"
            className={styles.input}
            value={currentState.beginAt.split("T")[0]}
            type="date"
            onChange={handleChange}
          />
          <span> - </span>
          <input
            name="endAt"
            className={styles.input}
            value={currentState.endAt.split("T")[0]}
            type="date"
            onChange={handleChange}
          />
        </div>
        <div id={styles.location} className={styles.item}>
          <label>Location:</label>
          <select
            id="location"
            className={styles.input}
            value={currentState.locationId}
            name="locationId"
            onChange={handleChange}
          >
            <option value="Default" hidden>
              Choose your location
            </option>
            {location.map((item, index) => (
              <option key={index} value={item._id}>
                {item.summary}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className={styles.btn}>
          {type === "add" ? "Add" : "Update"}
        </button>
        {type !== "add" && (
          <button type="button" className={`${styles.btn} ${styles.remove_btn}`} onClick={handleRemove}>
            Remove
          </button>
        )}
      </form>
    </>
  );
};

export default Info;
