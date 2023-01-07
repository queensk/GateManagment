import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminNav from "../../components/AdminNav/AdminNav";
import AdminContent from "../../components/AdminContent/AdminContent";
import "./Admin.css";
import { AuthContext } from "../../CustomHooks/Context/AuthProvider";

export default function Admin() {
  const [activeMenu, setActiveMenu] = useState("AdminUsersActive");
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };
  useEffect(() => {
    if (authenticated === false) {
      navigate("/user");
    }
  }, [authenticated, navigate]);

  return (
    <div className="Admin">
      <AdminNav
        activeMenu={activeMenu}
        handleMenuClick={handleMenuClick}
        setAuthenticated={setAuthenticated}
      />
      <AdminContent activeMenu={activeMenu} />
    </div>
  );
}
