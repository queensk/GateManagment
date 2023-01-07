import React from "react";
import "./AdminContent.css";
import AdminUsers from "./AdminUsers/AdminUsers";
import AdminManageUsers from "./AdminManageUsers/AdminManageUsers";
import AdminStatisticsActive from "./AdminStatisticsActive/AdminStatisticsActive";
import AdminUserGroupsActive from "./AdminUserGroupsActive/AdminUserGroupsActive";

export default function AdminContent({ activeMenu }) {
  return (
    <div className="AdminContent">
      {activeMenu === "AdminUsersActive" && <AdminManageUsers />}
      {activeMenu === "AdminCreateUserActive" && <AdminUsers />}
      {activeMenu === "AdminUserGroupsActive" && <AdminUserGroupsActive />}
      {activeMenu === "AdminStatisticsActive" && <AdminStatisticsActive />}
    </div>
  );
}
