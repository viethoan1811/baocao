import React, { useState, useEffect } from "react";
import "./CartMessage.scss";
import { correct, cross } from "../../utils/images";

const CartMessage = ({ text, status = true }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    // Clear the timer to prevent unexpected behavior
    return () => clearTimeout(timer);
  }, []); // Empty dependency array ensures that the effect runs only once

  return isVisible ? (
    <div className={`cart-message text-center ${status ? "success" : "error"}`}>
      <div className="cart-message-icon">
        {!status ? <img src={correct} alt="" /> : <img src={cross} alt="" />}
      </div>
      <h6 className="text-white fs-14 fw-5">{text}</h6>
    </div>
  ) : null;
};

export default CartMessage;
