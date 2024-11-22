import Cookies from "js-cookie";
import { useContext, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "reactjs-popup";
import { CartContext } from "../../context";

import "./style.css";

function Header() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const onClickLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };
  return (
    <>
      <div className="navbar">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="header-logo"
          />
        </Link>
        <ul className="lg-nav-links">
          <Link to="/">
            <li className="link">Home</li>
          </Link>
          <Link to="/products">
            <li className="link">Products</li>
          </Link>
          <Link to="/cart">
            <li className="link">
              Cart{" "}
              {cartItems.length > 0 && (
                <span className="cart-count">{cartItems.length}</span>
              )}
            </li>
          </Link>
          <li>
            <Popup
              trigger={
                <button type="button" className="btn btn-primary logout-button">
                  Logout
                </button>
              }
            >
              {(close) => (
                <div className="popup-modal-section">
                  <h2 className="lh-base">Are you sure want to logout?</h2>
                  <div className="buttons">
                    <button
                      type="button"
                      onClick={close}
                      className="btn btn-primary popup-button"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger popup-button"
                      onClick={onClickLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </li>
        </ul>
        <Popup
          trigger={
            <button type="button" className="sm-logout-btn">
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
                alt="nav logout"
                className="logout-icon"
              />
            </button>
          }
        >
          {(close) => (
            <div className="popup-modal-section">
              <h4 className="">Are you sure want to logout?</h4>
              <div className="buttons">
                <button
                  type="button"
                  onClick={close}
                  className="btn btn-primary popup-button"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger popup-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </Popup>
      </div>
      <ul className="sm-nav-links my-2">
        <li>
          <Link to="/">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              alt="nav"
              className="nav-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/products">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
              alt="nav"
              className="nav-icon"
            />
          </Link>
        </li>
        <li>
          <Link to="/cart" className="link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              alt="nav"
              className="nav-icon"
            />
            {cartItems.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Header;
