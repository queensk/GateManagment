import React, { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import api from "../../../api/api";
import "./AdminEditUsers.css";
import AdminContentSuccessPopUp from "../AdminContentSuccessPopUp/AdminContentSuccessPopUp";
import AdminContentSuccessDelete from "../AdminContentSuccessPopUp/AdminContentSuccessDelete";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";

export default function AdminEditUsers({
  editUserItem,
  setEditUserItem,
  handleUserDelete,
  deleteUserItem,
  deleteUserSuccess,
  setDeleteUserSuccess,
}) {
  const [successEdit, setSuccessEdit] = useState({});
  const [error, setError] = useState(null);
  const [editSuccess, setEditSuccess] = useState(false);
  const token = localStorage.getItem("gateManagementApi");

  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setEditUserItem({ ...editUserItem, [name]: value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: editUserItem.name,
      email: editUserItem.email,
      password_hash: editUserItem.password_hash,
    };
    api
      .put(`/users/${editUserItem.id}/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setSuccessEdit(...response.data);
        setEditSuccess(true);
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err.response);
      });
  };
  return (
    <>
      <form
        className="CreateUser EditUser"
        onSubmit={(e) => e.preventDefault()}
      >
        {error && <ErrorPopUp message={error} setError={setError} />}
        <label htmlFor="Edit User">Edit User</label>
        <br />
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          placeholder="Name"
          required
          autoFocus
          name="name"
          value={editUserItem.name}
          onChange={handleEditDataChange}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          placeholder="Email"
          required
          autoFocus
          name="email"
          value={editUserItem.email}
          onChange={handleEditDataChange}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="password"
          placeholder="Password"
          required
          autoFocus
          name="password_hash"
          value={editUserItem.password_hash}
          onChange={handleEditDataChange}
        />
        <button
          className="AdminAddUserButton"
          type="submit"
          aria-label="Add User"
        >
          <BsPlusSquare onClick={handleEditSubmit} />
        </button>
      </form>
      {editSuccess && (
        <AdminContentSuccessPopUp
          setSuccess={setEditSuccess}
          editUserItem={editUserItem}
        />
      )}
      {deleteUserSuccess && (
        <AdminContentSuccessDelete
          setSuccess={setDeleteUserSuccess}
          deleteUserItem={deleteUserItem}
          handleUserDelete={handleUserDelete}
        />
      )}
    </>
  );
}
