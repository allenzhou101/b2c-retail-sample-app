import React, { useEffect } from "react";
import { useState } from "react";
import { Col, Row, Typography } from "antd";
import { Button } from "antd";
import "./Cart.css";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from '@descope/react-sdk';

function Cart() {
  const getProductData = JSON.parse(localStorage.getItem("selectedItem"));
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  useEffect(() => {
    localStorage.setItem('pathState', 'CART');
  }, []);

  const [CART, setCART] = useState(getProductData);
  const handleRemove = (id) => {
    let updatedCart = CART.filter((item) => item.sys.id !== id);
    if (updatedCart <= 1) {
      navigate("/");
    }
    localStorage.setItem("selectedItem", JSON.stringify(updatedCart));
    let productDataFromLocalStorage = JSON.parse(
      localStorage.getItem("productData")
    )
      ? JSON.parse(localStorage.getItem("productData"))
      : [];
    let newArrivalDataFromLocalStorage = JSON.parse(
      localStorage.getItem("newArrivalData")
    )
      ? JSON.parse(localStorage.getItem("newArrivalData"))
      : [];
    productDataFromLocalStorage.map((item) => {
      if (item.sys.id === id) {
        item.fields.addedToCart = false;
      }
    });
    localStorage.setItem(
      "productData",
      JSON.stringify(productDataFromLocalStorage)
    );
    newArrivalDataFromLocalStorage.map((item) => {
      if (item.sys.id === id) {
        item.fields.addedToCart = false;
      }
    });
    localStorage.setItem(
      "newArrivalData",
      JSON.stringify(newArrivalDataFromLocalStorage)
    );
    navigate("/cart");
    return setCART(updatedCart);
  };

  const navigateThisTo = () => {
    if (authenticated) {
      navigate("/step-up");
    } else {
      navigate("/login");
      localStorage.setItem('pathState', 'CART');
    }
  }
  return (
    <div className="checkout-cart-container">
      <br />
      <Typography className="shopping-cart-heading">Shopping Cart</Typography>
      <br />
      <br />
      {CART && CART.length > 0 ? (
        <div className="cart-container">
          <div className="row-col-con">
            <Typography className="items-text">Items in Cart</Typography>
            {CART &&
              CART.length > 0 &&
              CART.map((product, id) => (
                <Row className="cart-row" key={id}>
                  <div className="cart-details">
                    <Col className="img-col">
                      <div className="product-img">
                        <img src={product.fields.image.fields.file.url} alt="cart"></img>
                      </div>
                    </Col>
                    <Col span={5} order={1}>
                      <Typography className="cart-product-title">
                        {product.fields.title}
                      </Typography>
                    </Col>
                    <Col span={5} order={3} className="product-quat">
                      <div className="counter">
                        <Button
                          type="seconday"
                          className="decrement-btn"
                          onClick={() => {
                            if (product.fields.quantity > 1) {
                              const _DECREMENT = CART.map((item, index) => {
                                return id === index
                                  ? { ...item, quantity: item.fields.quantity - 1 }
                                  : item;
                              });
                              setCART(_DECREMENT);
                            } else {
                              handleRemove(product.sys.id);
                            }
                          }}
                        >
                          -
                        </Button>
                        <div className="quantity">{product.fields.quantity}</div>
                        <Button
                          type="secondary"
                          className="increment-btn"
                          onClick={() => {
                            const _CART = CART.map((item, index) => {
                              return id === index
                                ? { ...item, quantity: item.fields.quantity + 1 }
                                : item;
                            });
                            setCART(_CART);
                          }}
                        >
                          +
                        </Button>
                      </div>
                    </Col>
                  </div>
                  <div className="price-details">
                    <Col span={5} order={4} className="product-price">
                      $ {(product.fields.price * product.fields.quantity).toFixed(2)}
                    </Col>
                    <Col
                      span={5}
                      order={4}
                      className="remove"
                      onClick={() => handleRemove(product.sys.id)}
                    >
                      <img
                        src={require("../../assets/Shape.svg").default}
                        alt="cart"
                        style={{ cursor: "pointer" }}
                      />
                    </Col>
                  </div>
                </Row>
              ))}
          </div>
          <br />
          <Typography className="cart-text">
            * To experience step-up authentication, click Proceed to Checkout..
          </Typography>

          <div className="order-details">
            <div className="order-summary">
              <Typography className="order-total">OrderTotal</Typography>
              <Typography className="price">
                $
                {CART.length > 0 &&
                  CART.map((products) => products.fields.price * products.fields.quantity)
                    .reduce((total, value) => total + value)
                    .toFixed(2)}
              </Typography>
            </div>
            <div className="proceed-btn">
              <Button 
                className="proceeed-btn"
                onClick={() => navigateThisTo()}
                >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <br />
          <Typography className="cart-text">
            <Link to="/">Please Click to Shopping</Link>
          </Typography>

          <div className="order-details">
            <div className="order-summary">
              <Typography className="order-total">OrderTotal</Typography>
              <Typography className="price">$</Typography>
            </div>
            <div className="proceed-btn">
              <Button
                className="proceeed-btn"
                disabled={CART && CART.length === 0 || !CART}
              >
                Proceed to Checkout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
