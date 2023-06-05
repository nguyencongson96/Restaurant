import { React, useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Event from "./pages/user/event";
import Main from "./pages/user/mainpage";
import AdminLayOut from "./pages/admin";
import AboutUs from "./pages/user/aboutUs";
import Menupage from "./pages/user/menu";
import Header from "./components/header/Header";
import Loading from "./components/loading";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import UserLayOut from "pages/user";
import InfoAdmin from "pages/admin/infomation";
import ReservationList from "pages/admin/reservation/List";
import ReservationInfo from "pages/admin/reservation/Info";
import ProductInfo from "pages/admin/product/Info";
import ProductList from "pages/admin/product/List";
import EventInfo from "pages/admin/event/Info";
import EventList from "pages/admin/event/List";
import Login from "pages/login/Login";
import "./App.css";

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
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<AdminLayOut />}>
              <Route path="info" element={<InfoAdmin />} />
              <Route path="product">
                <Route path="list" element={<ProductList />} />
                <Route path="add" element={<ProductInfo type="add" />} />
                <Route path="update" element={<ProductInfo type="update" />} />
              </Route>
              <Route path="reservation">
                <Route path="list" element={<ReservationList />} />
                <Route path="update" element={<ReservationInfo />} />
              </Route>
              <Route path="event">
                <Route path="list" element={<EventList />} />
                <Route path="add" element={<EventInfo type="add" />} />
                <Route path="update" element={<EventInfo type="update" />} />
              </Route>
              <Route index element={<InfoAdmin />} />
            </Route>
            <Route element={<UserLayOut />}>
              <Route path="/menu" element={<Menupage />} />
              <Route path="/event" element={<Event />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/*" element={<Main />} />
            </Route>
          </Routes>
          <ToastContainer />
        </div>
      )}
    </Provider>
  );
}

export default App;
