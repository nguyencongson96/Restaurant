import { React, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import ProPage from "./components/Promotion/ProPage";
import ReservationPage from "./components/Reservation/ReservationPage";
import ButtonToTop from "./components/buttonToTop/ButtonToTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Main from "./components/mainpage/Main";
import Footer from "./components/footer/Footer";
import AboutUs from "./components/aboutUs/AboutUs";
import Menupage from "./components/menuhomepage/Menupage";
import { Routes, Route } from "react-router-dom";

function App() {
  const [showReserve, setShowReserve] = useState(false);
  const handleShowReserve = () => {
    setShowReserve(!showReserve);
  };

  const handleNoti = (status, description) => {
    handleShowReserve();
    setTimeout(() => {
      toast[status](description, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }, 500);
  };

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-container">
          <div className="spinner one"> Sona</div>
          <div className="spinner two">
            <span className="line">
              A genuine fine-dining experience awaits.
            </span>
          </div>
        </div>
      ) : (
        // <div className="all">
        <div className="bigContainer">
          <Header showReversePage={handleShowReserve}></Header>
          <Routes>
            {/* <Main></Main> */}
            <Route path="/BTTC/" element={<Main />} />
            <Route path="/BTTC/Menu" element={<Menupage />} />
            <Route path="/BTTC/Promotion" element={<ProPage />} />
            <Route path="/BTTC/AboutUs" element={<AboutUs />} />
            <Route path="/BTTC*" element={<Main />} />

            {/* <Menupage></Menupage> */}
            {/* <ProPage /> */}
            {/* <AboutUs></AboutUs> */}
          </Routes>
          <ReservationPage
            showPage={showReserve}
            closePage={handleShowReserve}
            notification={handleNoti}
          />
          <ButtonToTop />
          <ToastContainer />
          <Footer></Footer>
        </div>
        // </div>
      )}
    </>
  );
}

export default App;
