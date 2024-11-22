import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate, Navigate } from "react-router-dom";
import "./style.css";

function LoginForm() {
  const navigation = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onsubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken);
    navigation("/");
  };

  const onsubmitError = (errorMsg) => {
    setErrorMsg(errorMsg);
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const userDetails = {
      username: username,
      password: password,
    };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",

      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.status === 200) {
      onsubmitSuccess(data.jwt_token);
    } else {
      onsubmitError(data.error_msg);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  return (
      <div className="login-form-bg container-fluid">
        <div className=" form-container">
          <div className="lg-device-image">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              alt="display-img"
              className="lg-img"
            />
          </div>
          <form className="form" onSubmit={onSubmitForm}>
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
              alt="website logo"
              className="website-logo"
            />
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
              alt="display-img"
              className="sm-img my-4"
            />
            <div className="form-field">
              <label htmlFor="username" className="form-label">
                USERNAME
              </label>
              <input
                type="text"
                className="form-input"
                placeholder="rahul"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required
                autoComplete="off"
              />
            </div>
            <div className="form-field">
              <label htmlFor="pwd" className="form-label">
                PASSWORD
              </label>
              <input
                type="password"
                className="form-input"
                placeholder="rahul@2021"
                id="pwd"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required
                autoComplete="off"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
            {errorMsg && (
              <p className="error my-1 fw-semibold p">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
  );
}

export default LoginForm;
