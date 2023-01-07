import React from "react";
import "./AdminUsers.css";
import AddUserForm from "./AddUserForm";

export default function AdminUsers() {
  return (
    <div>
      <nav className="AdminContentNav">
        <h1>Create Users</h1>
      </nav>
      <div>
        <AddUserForm />
      </div>
    </div>
  );
}
