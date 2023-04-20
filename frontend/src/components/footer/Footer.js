import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="ft-info ft-item">
        <div className="ft-title">Info</div>
        <div className="address">Xuan Dieu, Tay Ho, Ha Noi</div>
        <div className="email">contactus@sona.com</div>
        <div className="phone">+84 223 1997</div>
      </div>
      <div className="ft-open ft-item">
        <div className="ft-title">Open Time</div>
        <div>11:00 - 14:00 & 18:00 - 22:00</div>
      </div>
      <div className="ft-social ft-item">
        <div className="ft-title">Social Media</div>
        <div>@Sona</div>
        <div className="social-icon"></div>
      </div>
    </div>
  );
};

export default Footer;
