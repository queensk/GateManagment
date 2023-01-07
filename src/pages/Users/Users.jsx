import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import api from "../../api/api";
import "./Users.css";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";
import UserActivity from "./UserActivity";
import ErrorPopUp from "../../components/ErrorPopUp/ErrorPopUp";

export default function Users() {
  const [logInName, setLogInName] = useState("");
  const [logInPassword, setLogInPassword] = useState("");
  const [error, setError] = useState(null);
  const { authenticated, userName, userId, userRole, setAuthenticated } =
    useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      password: logInPassword,
      userMail: logInName,
    };
    api
      .post("../login", data)
      .then((response) => {
        localStorage.setItem("gateManagementApi", response.data.token);
        setAuthenticated(true);
      })
      .catch((err) => {
        if (err.response.status) {
          localStorage.clear();
          setError("oops! Lost connection");
        } else if (err.request.response) {
          setError(err.request.response);
        }
        setError(err.response.data.message);
      });
  };

  return (
    <>
      {error && <ErrorPopUp message={error} setError={setError} />}
      {authenticated && userRole === "admin" && <Navigate to="/admin" />}
      {authenticated && (
        <UserActivity
          authenticated={authenticated}
          userName={userName}
          userId={userId}
          setAuthenticated={setAuthenticated}
        />
      )}
      {!authenticated && (
        <div className="loginContainer">
          <div className="singUpWrapper">
            <form className="formSignIn" onClick={(e) => e.preventDefault}>
              <h2 className="formSignInHeading">Login</h2>
              <div>
                <br />
                <input
                  type="email"
                  name="email"
                  placeholder="johnduke@gmail.com"
                  required
                  autoFocus
                  value={logInName.trim()}
                  onChange={(e) => setLogInName(e.target.value)}
                />
              </div>
              <div>
                <label>Password</label>
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="*******"
                  required
                  autoFocus
                  // minLength={8}
                  // pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
                  value={logInPassword}
                  onChange={(e) => setLogInPassword(e.target.value)}
                />
              </div>
              <br />
              <button
                onClick={handleLogin}
                className="signInButton"
                type="submit"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
