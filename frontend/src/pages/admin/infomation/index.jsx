import React, { useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./info.module.css";
import infoSlice, { getInfo, updateInfo } from "store/reducers/info";
import { getCityList } from "store/reducers/general";
import LocationInput from "./locationItem";

const Information = () => {
  const dispatch = useDispatch();
  const { updateState } = infoSlice.actions;
  const { currentState, cityList } = useSelector((state) => {
    return { currentState: state.infos.currentState, cityList: state.general.place.city };
  });

  useEffect(() => {
    dispatch(getInfo({ detail: 0 }));
    dispatch(getCityList());
  }, [dispatch]);

  const handleChange = useCallback(
    (type, value) => dispatch(updateState({ ...currentState, [type]: value })),
    [currentState, dispatch, updateState]
  );

  const handleSubmit = useCallback(() => {
    dispatch(updateInfo(currentState));
  }, [dispatch, currentState]);

  function handleAddImage() {
    const copyState = { ...currentState };
    dispatch(updateState(Object.assign(copyState, { image: [...copyState.image, ""] })));
  }

  function handleRemoveImage(index) {
    const newState = { ...currentState };
    const newImgArr = newState.image.toSpliced(index, 1);
    return dispatch(updateState(Object.assign(newState, { image: newImgArr })));
  }

  return (
    <>
      <h1 className={styles.header}>General Information</h1>
      <div className={styles.info}>
        <div className={styles.item}>
          <label>Name: </label>
          <input
            className={styles.input}
            type="text"
            value={currentState.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label>Phone: </label>
          <input
            className={styles.input}
            type="text"
            defaultValue={currentState.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label>Email: </label>
          <input
            className={styles.input}
            type="text"
            defaultValue={currentState.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label>Description: </label>
          <textarea
            className={styles.input}
            type="text"
            value={currentState.description}
            rows="3"
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label>Image: </label>
          <div id={styles.image} className={styles.input_area}>
            {currentState.image.map((item, index) => (
              <div className={styles.image_row} key={`image.${index}`}>
                <input
                  className={styles.input}
                  type="text"
                  value={item}
                  onChange={(e) => {
                    console.log(`image.${index}`);
                    const ImageArr = [...currentState.image];
                    ImageArr.splice(index, 1, e.target.value);
                    handleChange("image", ImageArr);
                  }}
                />
                <svg
                  className={styles.remove_image}
                  height="1em"
                  viewBox="0 0 448 512"
                  onClick={() => handleRemoveImage(index)}
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
        <div className={styles.item}>
          <label>Time: </label>
          <div id={styles.time} className={styles.input_area}>
            {currentState.time.map((item, index) => (
              <div key={item._id} className={styles.time}>
                <label>Opening:</label>
                <input
                  className={styles.input}
                  type="time"
                  value={item.open}
                  onChange={(e) => {
                    const copyState = [...currentState.time];
                    copyState.splice(index, 1, { ...item, open: e.target.value });
                    handleChange("time", copyState);
                  }}
                />
                <label>Closing:</label>
                <input
                  className={styles.input}
                  type="time"
                  value={item.close}
                  onChange={(e) => {
                    const copyState = [...currentState.time];
                    copyState.splice(index, 1, { ...item, close: e.target.value });
                    handleChange("time", copyState);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
        <div className={styles.item}>
          <label>Location: </label>
          <div id={styles.location} className={styles.input_area}>
            {currentState.location.map((item, index) => (
              <LocationInput
                key={`location.${index}`}
                index={index}
                stateValue={currentState.location}
                cityList={cityList}
                handleChange={handleChange}
              />
            ))}
          </div>
        </div>
        <button className={styles.btn} onClick={handleSubmit}>
          Update
        </button>
      </div>
    </>
  );
};

export default Information;
