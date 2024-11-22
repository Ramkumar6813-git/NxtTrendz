import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../context";

import Header from "../Header/header";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

import "./style.css";

function Cart() {
  const {
    cartItems,
    emptyCartItems,
    increaseCartItemQuantity,
    decreaseCartItemQuantity,
    removeCartItem,
  } = useContext(CartContext);

  // This function returns the total cart value
  const getTotalCartValue = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const onClickDecreaseQuantity = (id) => {
    decreaseCartItemQuantity(id);
  };
  const onClickIncreaseQuantity = (id) => {
    increaseCartItemQuantity(id);
  };

  const onClickRemoveCartItem = (id) => {
    removeCartItem(id);
  };

  const onClickRemoveCartItems = () => {
    emptyCartItems();
  };

  const displayEmptyCartItems = () => {
    return (
      <div className="no-cart-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
          alt="no cart"
          className="no-cart-image"
        />
        <h1 className="no-cart-heading my-4">Your Cart Is Empty</h1>
        <Link to="/products">
          <button type="button" className="btn btn-primary py-2 px-3">
            Shop Now
          </button>
        </Link>
      </div>
    );
  };
  const displayCartItems = () => {
    return (
      <div className="cart-items-view">
        <h1 className="head-text cart-heading my-2 ">My Cart</h1>
        <button
          className="remove-cart-items-btn fs-5 fs-lg-3 text-primary fw-semibold"
          onClick={onClickRemoveCartItems}
        >
          Remove All
        </button>
        <ul className="cart-list">
          {cartItems.map((item) => {
            const {
              brand,
              id,
              imageUrl,
              price,
              title,
              quantity,
            } = item;
            return (
              <li
                key={id}
                className="cart-item py-2 px-3 p-lg-4 my-3 rounded-2"
              >
                <img
                  src={imageUrl}
                  alt="cart img"
                  className="cart-item-image rounded-2"
                />
                <div className="cart-item-details px-3">
                  <p className="cart-item-name my-0">{title}</p>
                  <p className="cart-item-brand my-1 px-lg-3">by {brand}</p>
                  <div className="quantity-count-container pb-2">
                    <button
                      type="button"
                      onClick={() => {
                        onClickDecreaseQuantity(id);
                      }}
                    >
                      <CiSquareMinus className="cart-minus-icon" />
                    </button>
                    <p className="fs-5 mt-1">{quantity}</p>
                    <button
                      type="button"
                      onClick={() => {
                        onClickIncreaseQuantity(id);
                      }}
                    >
                      <CiSquarePlus className="cart-plus-icon" />
                    </button>
                  </div>
                  <div className="price-div d-flex justify-content-between py-2">
                    <h4 className="my-0">Rs {quantity * price}/-</h4>
                    <button
                      type="button"
                      className="remove-btn my-0 pt-1 pt-md-0 mx-5 mx-md-3 fs-5"
                      onClick={() => {
                        onClickRemoveCartItem(id);
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="checkout-div">
          <h4>
            Order Total :-{" "}
            <span className="total-cart-value">{getTotalCartValue()}/-</span>
          </h4>
          <p>{cartItems.length} items in cart</p>
          <button type="button" className="btn btn-primary" disabled>
            Checkout
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <Header />
      <div className="cart-page">
        {cartItems.length >= 1 ? displayCartItems() : displayEmptyCartItems()}
      </div>
    </div>
  );
}

export default Cart;
