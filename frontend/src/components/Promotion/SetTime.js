import React, { useState } from "react";

const SetTime = (props) => {
  const { expirationDate } = props;
  // Lấy thông tin thời gian hiện tại
  const date = new Date(),
    // Tính thời gian khuyến mãi còn được áp dụng
    currentTimeLeft =
      (Date.parse(expirationDate) -
        (date - date.getTimezoneOffset() * 60 * 1000)) /
      1000;

  // Set State cho 3 giá trị giờ, phút và giây
  const [hourLeft, setHourLeft] = useState(
      Math.floor(currentTimeLeft / 60 / 60)
    ),
    [minuteLeft, setMinuteLeft] = useState(
      Math.floor(currentTimeLeft / 60 - hourLeft * 60)
    ),
    [secondLeft, setsecondLeft] = useState(
      Math.floor(currentTimeLeft - hourLeft * 60 * 60 - minuteLeft * 60)
    );

  //Tiến hành tính toán và set State lại cho giờ phút giây sau mỗi 1 giây
  setTimeout(() => {
    if (hourLeft > 0) {
      setsecondLeft(secondLeft === 0 ? 59 : secondLeft - 1);
      secondLeft === 0 && setMinuteLeft(minuteLeft === 0 ? 59 : minuteLeft - 1);
      minuteLeft === 0 &&
        secondLeft === 0 &&
        setHourLeft(hourLeft === 0 ? 59 : hourLeft - 1);
    }
  }, 1000);

  // Tiến hành format giờ phút giây để render ra màn hình
  const hourLeftFormat =
      hourLeft.toString().length === 1 ? `0${hourLeft}` : hourLeft,
    minuteLeftFormat = ("0" + minuteLeft).slice(-2),
    secondLeftFormat = ("0" + secondLeft).slice(-2);

  return (
    <span className="time-left">
      {hourLeft < 0
        ? "Event Expired"
        : `${hourLeftFormat} : ${minuteLeftFormat} : ${secondLeftFormat}`}
    </span>
  );
};

export default SetTime;
