import React, { useEffect, useState } from "react";
import ProComponent from "./ProComponent";

const ProPage = () => {
  const [promoList, setPromoList] = useState([]);
  useEffect(() => {
    fetch("https://63fd5f67859df29986cdf0c5.mockapi.io/api/v1/PromotionData", {
      method: "GET",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((list) =>
        list.sort(
          (a, b) => Date.parse(a.expirationDate) - Date.parse(b.expirationDate)
        )
      )
      .then((sortList) => setPromoList(sortList));
  }, []);
  const PromoElement = promoList.map((item, index) => {
    return <ProComponent key={item.id} item={item} index={index} />;
  });

  return (
    <div className="promote">
      <div className="promote-banner">
        <h1 className="promote-banner-title">Promotion and Event</h1>
        <svg
          className="promote-scroll-down"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
          onClick={() => {
            window.scrollTo(0, window.innerHeight);
          }}
        >
          <path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z" />
        </svg>
      </div>
      <div className="promote-container">{PromoElement}</div>
    </div>
  );
};

export default ProPage;
