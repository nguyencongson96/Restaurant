import React from "react";
import SetTime from "./SetTime";
import "./ProComponent.css";

const ProComponent = (props) => {
  const {
    item: { type, imgURL, title, des, expirationDate },
    index,
  } = props;
  //Xác định vị trí trong list danh sách để đảo vị trí trái phải
  const isEven = index % 2 !== 0 ? "reverse" : "";
  //Tính deadline dựa trên ngày hết hạn
  const deadLine = new Date(
      Date.parse(expirationDate) +
        new Date(expirationDate).getTimezoneOffset() * 60 * 1000 -
        1
    ),
    deadlineFormat = Intl.DateTimeFormat("en-GB").format(deadLine);

  return (
    <div className={`promote-item ${isEven}`}>
      <div className="promote-img">
        <div className={`promote-expire-date ${isEven}`}>{deadlineFormat}</div>
        <img src={imgURL} alt="promotion" />
      </div>
      <div className={`promote-text ${isEven}`}>
        <h1 className="promote-header">{type}</h1>
        <h2 className="promote-title">{title}</h2>
        <p className={`promote-des ${isEven}`}>
          {des.map((desItem) => {
            return (
              <span
                key={des.indexOf(desItem)}
                className={desItem.bold === true ? "bold" : ""}
              >
                {desItem.text}
              </span>
            );
          })}
        </p>
        <div className={`promote-time-left ${isEven}`}>
          Time Left: <SetTime expirationDate={expirationDate} />
        </div>
      </div>
    </div>
  );
};

export default ProComponent;
