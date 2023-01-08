import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import api from "../../../api/api";
import { AdminContentSuccessPopUp } from "../AdminContentSuccessPopUp";
import "./AdminUserGroupsActive.css";

export default function AdminUserGroupsActive() {
  const [role, setRole] = useState("");
  const [AdminSearch, setAdminSearch] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [editUserItem, setEditUserItem] = useState({});
  const [successUpdateRole, setSuccessUpdateRole] = useState(false);
  const [successUpdateRoleData, setSuccessUpdateRoleData] = useState({});
  const token = localStorage.getItem("gateManagementApi");

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(
        `/users/${editUserItem.id}/update/`,
        { role },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setSuccessUpdateRoleData({ ...response?.data?.user });
        setSuccessUpdateRole(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(() => {
    const handleAdminSearch = async () => {
      try {
        const response = await api.get(`/users/search/${AdminSearch}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSearchData([await response?.data?.users]);
      } catch (err) {
        console.log(err.response.data);
      }
    };
    handleAdminSearch();
  }, [AdminSearch, token]);

  return (
    <div className="AdminGroupContainer">
      <div className="AdminMangerSearch">
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
                    setRole("");
                  }}
                >
                  Edit
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
      <form className="FormChangeRole" onSubmit={handleSubmit}>
        {/* {error && <p className="error">{error}</p>} */}
        <p>
          Name:
          <span className="ChangeRoleUserData">{editUserItem?.name}</span>
        </p>
        <p>
          Email:
          <span className="ChangeRoleUserData">{editUserItem?.email}</span>
        </p>
        <p>
          Role:
          <span className="ChangeRoleUserData">
            {role || editUserItem?.role}
          </span>
        </p>
        <label htmlFor="role">Change Role:</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <button type="submit" className="ChangeRoleButton">
          Change Role
        </button>
      </form>
      {successUpdateRole && (
        <AdminContentSuccessPopUp
          setSuccess={setSuccessUpdateRole}
          editUserItem={successUpdateRoleData}
        />
      )}
    </div>
  );
}
