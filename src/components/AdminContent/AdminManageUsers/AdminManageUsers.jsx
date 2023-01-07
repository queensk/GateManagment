import React, { useState, useEffect } from "react";
import "./AdminManageUsers.css";
import { BsSearch } from "react-icons/bs";
import api from "../../../api/api";
import AdminEditUsers from "../AdminEditUsers/AdminEditUsers";
import ErrorPopUp from "../../ErrorPopUp/ErrorPopUp";

export default function AdminManageUsers() {
  const [AdminSearch, setAdminSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [editUserItem, setEditUserItem] = useState({});
  const [deleteUserItem, setDeleteUserItem] = useState({});
  const [deleteUserSuccess, setDeleteUserSuccess] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("gateManagementApi");

  useEffect(() => {
    const handleAdminSearch = async () => {
      try {
        const response = await api.get(`/users/search/${AdminSearch}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSearchData([await response.data.users]);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    handleAdminSearch();
  }, [AdminSearch, token]);

  const handleUserDelete = () => {
    api
      .delete(`/users/${deleteUserItem.id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setError(response.data.message);
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };
  return (
    <>
      <nav className="AdminManageNav">
        <h1>Manage Users</h1>
      </nav>
      <div className="AdminMangerSearch">
        {error && <ErrorPopUp message={error} setError={setError} />}
        <div className="AdminSearch">
          <input
            type="text"
            className="AdminSearchTerm"
            placeholder="What are you looking for?"
            value={AdminSearch}
            autoFocus
            onChange={(e) => {
              setAdminSearch(e.target.value);
            }}
          />
          <button type="submit" className="searchButton">
            <BsSearch />
          </button>
        </div>
        {searchData[0]?.length > 0 && AdminSearch && (
          <ul className="UserSearchData">
            {searchData[0]?.map((user, index) => (
              <li key={index}>
                <span>
                  Name:
                  {user?.name}
                </span>{" "}
                -
                <span>
                  Email:
                  {user?.email}
                </span>
                <button
                  className="AdminEditUsers"
                  onClick={(e) => {
                    setEditUserItem({ ...user });
                    setAdminSearch("");
                  }}
                >
                  Edit
                </button>
                <button
                  className="AdminDeleteUser"
                  onClick={(e) => {
                    setDeleteUserItem({ ...user });
                    setDeleteUserSuccess(true);
                    setAdminSearch("");
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <AdminEditUsers
        editUserItem={editUserItem}
        setEditUserItem={setEditUserItem}
        handleUserDelete={handleUserDelete}
        deleteUserItem={deleteUserItem}
        deleteUserSuccess={deleteUserSuccess}
        setDeleteUserSuccess={setDeleteUserSuccess}
      />
    </>
  );
}
