import { Navigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header/header";

import "./style.css";

function Home() {
  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="container">
      <Header />
      <div className="container-fluid home-page">
        <div className="main-content">
          <h1>Clothes That Get YOU Noticed</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
            alt="clothes that get you noticed"
            className="sm-display-image my-2"
          />
          <p className="my-4">
            Fashion is part of the daily air and it does not quite help that it
            changes all the time. Clothes have always been a marker of the era
            and we are in a revolution. Your fashion makes you been seen and
            heard that way you are. So, celebrate the seasons new and exciting
            fashion in your own way.
          </p>
          <Link to="/products">
            <button type="button" className="btn btn-primary shop-now-btn">
              Shop Now
            </button>
          </Link>
        </div>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
          alt="clothes that get you noticed"
          className="lg-display-image my-2"
        />
      </div>
    </div>
  );
}

export default Home;
