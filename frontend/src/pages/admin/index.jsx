import React, { useEffect } from "react";
import Dashboard from "./dashboard";
import styles from "./admin.module.css";
import { Outlet, useNavigate } from "react-router-dom";
import ReservationPage from "components/reservation";
import ButtonToTop from "components/buttonToTop";
import { useSelector } from "react-redux";

const Index = () => {
  const { isLogIn } = useSelector((state) => state.infos);
  const navigate = useNavigate();

  useEffect(() => {
    !isLogIn && navigate("/login");
  }, [isLogIn, navigate]);

  return (
    <div className={styles.admin}>
      <Dashboard />
      <div className={styles.show}>
        <Outlet />
      </div>
      <ReservationPage />
      <ButtonToTop />
    </div>
  );
};

export default Index;
