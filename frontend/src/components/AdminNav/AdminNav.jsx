import React from "react";
import {
  BsPeopleFill,
  BsPersonPlusFill,
  BsPeople,
  BsBarChartLineFill,
  BsPersonFill,
} from "react-icons/bs";
import "./AdminNav.css";

export default function AdminNav({
  activeMenu,
  handleMenuClick,
  setAuthenticated,
}) {
  const handleLogOut = () => {
    localStorage.clear();
    setAuthenticated(false);
  };
  return (
    <nav className="AdminNav">
      <ul className="AdminUser">
        <li className="AdminUserIcon">
          <BsPersonFill /> user name
        </li>
        <li>
          <button className="AdminLogOutButton" onClick={handleLogOut}>
            Log out
          </button>
        </li>
      </ul>
      <ul className="AdminNavItems">
        <li
          className={activeMenu === "AdminUsersActive" ? "active" : ""}
          onClick={() => {
            handleMenuClick("AdminUsersActive");
          }}
        >
          <BsPeopleFill /> USERS
        </li>
        <li
          className={activeMenu === "AdminCreateUserActive" ? "active" : ""}
          onClick={() => {
            handleMenuClick("AdminCreateUserActive");
          }}
        >
          <BsPersonPlusFill /> CREATE USERS
        </li>
        <li
          className={activeMenu === "AdminUserGroupsActive" ? "active" : ""}
          onClick={() => {
            handleMenuClick("AdminUserGroupsActive");
          }}
        >
          <BsPeople /> USER GROUPS
        </li>
        <li
          className={activeMenu === "AdminStatisticsActive" ? "active" : ""}
          onClick={() => {
            handleMenuClick("AdminStatisticsActive");
          }}
        >
          <BsBarChartLineFill /> STATISTICS
        </li>
      </ul>
    </nav>
  );
}
