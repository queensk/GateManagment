import React from "react";
import "./NavBar.css";
import { BsList, BsPersonFill } from "react-icons/bs";
import ToggleAvailability from "./ToggleAvailability";

export default function NavBar({
  authenticated,
  userName,
  userId,
  setAuthenticated,
}) {
  const handleLogout = (e) => {
    localStorage.clear();
    setAuthenticated(false);
  };
  return (
    <nav className="navigation" id="navigation">
      <div className="container">
        <div className="logo">logo</div>
        <ul className="navigation-links">
          <li className="active">home</li>
          <li>about</li>
          <li>contact</li>
          <BsList className="icon" />
        </ul>
        {authenticated && <ToggleAvailability userId={userId} />}
        {authenticated && (
          <div className="user">
            <BsPersonFill className="userIcon" />
            {userName}
            <button onClick={handleLogout}> log out</button>
          </div>
        )}
      </div>
    </nav>
  );
}
