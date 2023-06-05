import React, { useEffect } from "react";
import ScrollEvent from "../../utils/ScrollEvent";
import { Link } from "react-router-dom";
import ResNav from "./ResNav";
import styles from "./header.module.css";
import { useDispatch, useSelector } from "react-redux";
import generalSlice from "../../store/reducers/general";
import reservationsSlice from "../../store/reducers/reservation";

const Header = () => {
  const { name } = useSelector((state) => state.infos.detail);
  const { resNav } = useSelector((state) => state.general);
  const { checkWidth, setShow: setShowResNav } = generalSlice.actions;
  const { setShow: setShowReservation } = reservationsSlice.actions;
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(checkWidth(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [dispatch, checkWidth]);

  const handleShowReservation = () => {
    dispatch(setShowReservation());
  };

  return (
    <>
      <div className={`${styles.header} ${ScrollEvent(0) ? styles.show : ""}`}>
        <Link to="/" className={styles.left}>
          {name}
        </Link>
        <div className={styles.right}>
          <Link to="/menu">Menu</Link>
          <Link to="/event">Event</Link>
          <Link to="/about-us">About Us</Link>
          <div onClick={handleShowReservation}>Reservation</div>
        </div>
        {resNav.isSatisfyWidth && (
          <i
            className={`fa-solid fa-bars ${styles.fa_bars}`}
            onClick={() => {
              dispatch(setShowResNav());
            }}
          ></i>
        )}
        {resNav.isShow && <ResNav />}
      </div>
    </>
  );
};

export default Header;
