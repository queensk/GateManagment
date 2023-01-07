import React, { useEffect, useState } from "react";
import api from "../../api/api";

export default function ToggleAvailability({ userId }) {
  const [available, setIsAvailable] = useState(false);
  const token = localStorage.getItem("gateManagementApi");
  useEffect(() => {
    api
      .get(`/users/${userId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { availability } = response.data.user;
        setIsAvailable(availability);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userId, token]);

  const handleToggleAvailable = () => {
    const data = {
      availability: !available,
    };

    api
      .patch(`/users/${userId}/update/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setIsAvailable(response.data.user.availability);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="toggle">
      <button
        style={{ backgroundColor: available ? "green" : "red" }}
        onClick={(e) => {
          handleToggleAvailable();
        }}
      >
        Availability: {available ? "TRUE" : "FALSE"}
      </button>
    </div>
  );
}
