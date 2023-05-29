import { React, useState } from "react";
import { useEffect } from "react";
import "./App.css";
import Event from "./pages/event";
import ReservationPage from "./components/reservation";
import ButtonToTop from "./components/buttonToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/header/Header";
import Main from "./pages/mainpage/Main";
import Footer from "./components/footer/Footer";
import Loading from "./components/loading";
import AboutUs from "./pages/aboutUs";
import Menupage from "./pages/menu/Menupage";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

function App() {
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
        <Loading />
      ) : (
        <div className="bigContainer">
          <Header />
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/menu" element={<Menupage />} />
            <Route path="/event" element={<Event />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/*" element={<Main />} />
          </Routes>
          <ReservationPage />
          <ButtonToTop />
          <ToastContainer />
          <Footer />
        </div>
      )}
    </Provider>
  );
}

export default App;
