import React from "react";
import { Typography, Button, Row, Col } from "antd";
import "./order.css";
import { useNavigate } from "react-router";
function OrderPlaced() {
  const navigate = useNavigate();

  return (
    <div className="checkout-order-container">
      <Typography className="checkout-text">Checkout</Typography>
      <br />
      <br />
      <div className="order-container">
        <Typography className="order-heading">
          Thank You,<br></br> your order has been placed!
        </Typography>
        <Typography className="order-sub-heading">
          Please check your email for your confimation.{" "}
        </Typography>
        <br />
        <div className="btn-just-cont">
          <Button className="btn-just" onClick={() => navigate("/")}>
            Just take me home
          </Button>
          <Button className="btn-feed">Feeling Lucky?</Button>
        </div>
      </div>
    </div>
  );
}

export default OrderPlaced;
