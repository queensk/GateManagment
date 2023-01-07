import React, { useState } from "react";
import { BsPlusSquare } from "react-icons/bs";
import api from "../../../api/api";

export default function AddUserForm() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("gateManagementApi");

  const handleAdminCreateUser = (e) => {
    e.preventDefault();
    const data = {
      name: userName,
      email: userEmail,
      password_hash: userPassword,
    };
    api
      .post("/users/", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUserData([...userData, response.data]);
        setUserName("");
        setUserEmail("");
        setUserPassword("");
      })
      .catch((err) => {
        setError(err.data);
      });
  };
  return (
    <>
      <form className="CreateUser" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="Add User">Add User</label>
        <br />
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          placeholder="Name"
          required
          autoFocus
          value={userName}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <label htmlFor="Email">Email</label>
        <input
          type="text"
          placeholder="Email"
          required
          autoFocus
          value={userEmail}
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <label htmlFor="Password">Password</label>
        <input
          type="text"
          placeholder="Password"
          required
          autoFocus
          minLength={8}
          pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}"
          value={userPassword}
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <button
          className="AdminAddUserButton"
          type="submit"
          aria-label="Add User"
        >
          <BsPlusSquare onClick={handleAdminCreateUser} />
        </button>
      </form>
      <div className="AdminCreateContent">
        {userData.length > 0 &&
          userData
            .slice(0, 2)
            .reverse()
            .map((data, index) => (
              <div key={index} className="AdminCreateUser">
                <p>Successfully created User</p>
                <p>
                  Name:
                  <span>{data[0]?.user?.name}</span>
                </p>
                <p>
                  Email:
                  <span>{data[0]?.user?.email}</span>
                </p>
                <p>
                  User Id:
                  <span>{data[0]?.user?.id}</span>
                </p>
                <p>
                  Create at:
                  <span>{data[0]?.user?.create_time}</span>
                </p>
                <p>
                  modified at:
                  <span>{data[0]?.user?.updated_time}</span>
                </p>
              </div>
            ))}
      </div>
    </>
  );
}
