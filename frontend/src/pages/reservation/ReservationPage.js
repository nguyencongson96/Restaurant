import React, { useState } from "react";
import Validation from "./Validation";
import "./Reservation.css";

const ReservationPage = (props) => {
  const { showPage, closePage, notification } = props;
  const [bookingInfo, setBookingInfo] = useState({
    name: "",
    phone: "",
    location: "Hoang Cau",
    numberOfPeople: "1",
    date: "",
  });

  function handleChange(e) {
    //Lấy thông tin key từ name của input
    const key = e.target.name;
    //Điều chỉnh lại state từ value của key đã lấy bên trên
    setBookingInfo({ ...bookingInfo, [key]: e.target.value });
  }

  function handleSubmit(event) {
    //Ngăn chặn ấn submit sẽ reload lại web
    event.preventDefault();
    //Lấy thông tin booking List từ local Storage
    const bookingList =
      localStorage.getItem("BookingInfo") === null
        ? []
        : JSON.parse(localStorage.getItem("BookingInfo"));
    //Check validation
    const result = Validation(bookingInfo);
    notification(result.status, result.message);
    //Trường hợp đặt bàn thành công sẽ thêm vào local Storage và thiết lập lại value của các input về value mặc định ban đầu
    if (result.status === "success") {
      bookingList.push(bookingInfo);
      localStorage.setItem("BookingInfo", JSON.stringify(bookingList));
      setBookingInfo({
        name: "",
        phone: "",
        location: "Hoang Cau",
        numberOfPeople: "1",
        date: "",
      });
    }
  }

  return (
    <div className={`reserve-booking ${showPage ? "show-reserve" : ""}`}>
      {showPage && (
        <form className="reserve-form">
          <h3 className="reserve-header">Reservations</h3>
          <div className="reserve-items">
            <div className="item name">
              <label>Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input"
                value={bookingInfo.name}
                onChange={handleChange}
                name="name"
              ></input>
            </div>
            <div className="item phone">
              <label>Phone Number</label>
              <input
                type="text"
                placeholder="Enter your phone number"
                className="input"
                value={bookingInfo.phone}
                onChange={handleChange}
                name="phone"
              ></input>
            </div>
            <div className="item location">
              <label htmlFor="location">Location:</label>
              <select
                id="location"
                className="input"
                value={bookingInfo.location}
                onChange={handleChange}
                name="location"
              >
                <option value="Hoang Cau">Hoang Cau, Dong Da, Hanoi</option>
                <option value="Xuan Dieu">Xuan Dieu, Tay Ho, Hanoi</option>
                <option value="Trung Kinh">Trung Kinh, Cau Giay, Hanoi</option>
              </select>
            </div>
            <div className="item number">
              <label htmlFor="number">Number of people:</label>
              <select
                id="number"
                className="input"
                value={bookingInfo.numberOfPeople}
                onChange={handleChange}
                name="numberOfPeople"
              >
                <option value="1">1 Person</option>
                <option value="2">2 People</option>
                <option value="3">3 People</option>
                <option value="4">4 People</option>
                <option value="4+">4+ People</option>
              </select>
            </div>
            <div className="item date">
              <label htmlFor="date">Date:</label>
              <input
                className="input"
                type={"datetime-local"}
                id="date"
                placeholder="Date"
                value={bookingInfo.date}
                onChange={handleChange}
                name="date"
              />
            </div>
          </div>
          <button className="reserve-submit" onClick={handleSubmit}>
            Book a Table
          </button>
        </form>
      )}
      <span className="close-form" onClick={closePage}>
        x
      </span>
    </div>
  );
};

export default ReservationPage;
