import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "components/footer/Footer";
import ReservationPage from "components/reservation";
import ButtonToTop from "components/buttonToTop";

const UserLayOut = () => {
  return (
    <>
      <Outlet />
      <ReservationPage />
      <ButtonToTop />
      <Footer />
    </>
  );
};

export default UserLayOut;
