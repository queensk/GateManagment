import React, { useRef, useState, useEffect } from "react";
import "./NavBar.css";
import { BsList, BsPersonFill, BsFillXSquareFill } from "react-icons/bs";
import ToggleAvailability from "./ToggleAvailability";

export default function NavBar({
  authenticated,
  userName,
  userId,
  setAuthenticated,
}) {
  const toggleIcon = useRef("");
  const [isMobile, setIsMobile] = useState(true);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const handleLogout = (e) => {
    localStorage.clear();
    setAuthenticated(false);
  };

  const handleToggleNavMenu = (e) => {
    toggleIcon.current.classList.toggle("Nav-Visible");
    setIsMobile(!isMobile);
  };

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <nav className="navigation" id="navigation">
      <div className="container">
        <div className="logo">logo</div>
        <ul className="navigation-links " ref={toggleIcon}>
          <li className="active">home</li>
          <li>about</li>
          <li>contact</li>
          {authenticated && screenWidth < 768 && !isMobile && (
            <ToggleAvailability userId={userId} />
          )}
          {authenticated && screenWidth < 768 && !isMobile && (
            <div className="user">
              <BsPersonFill className="userIcon" />
              {userName}
              <button onClick={handleLogout}> log out</button>
            </div>
          )}
        </ul>
        {isMobile && <BsList className="icon" onClick={handleToggleNavMenu} />}
        {!isMobile && (
          <BsFillXSquareFill className="icon" onClick={handleToggleNavMenu} />
        )}
        {authenticated && screenWidth > 768 && (
          <ToggleAvailability userId={userId} />
        )}
        {authenticated && screenWidth > 768 && (
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
