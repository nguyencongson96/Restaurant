import { React, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import ProPage from "./pages/promotion/ProPage";
import ReservationPage from "./pages/reservation/ReservationPage";
import ButtonToTop from "./components/buttonToTop/ButtonToTop";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Main from "./pages/mainpage/Main";
import Footer from "./components/footer/Footer";
import AboutUs from "./pages/aboutUs/AboutUs";
import Menupage from "./pages/menuhomepage/Menupage";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

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
    <Provider store={store}>
      {loading ? (
        <div className="loader-container">
          <div className="spinner one"> Sona</div>
          <div className="spinner two">
            <span className="line">A genuine fine-dining experience awaits.</span>
          </div>
        </div>
      ) : (
        <div className="bigContainer">
          <Header showReversePage={handleShowReserve}></Header>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/Menu" element={<Menupage />} />
            <Route path="/Promotion" element={<ProPage />} />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/*" element={<Main />} />
          </Routes>
          <ReservationPage showPage={showReserve} closePage={handleShowReserve} notification={handleNoti} />
          <ButtonToTop />
          <ToastContainer />
          <Footer />
        </div>
      )}
    </Provider>
  );
}

export default App;
