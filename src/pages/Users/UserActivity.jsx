import React, { useState, useEffect } from "react";
import api from "../../api/api";
import NavBar from "../../components/NavBar/NavBar";
import UserAppointment from "../../components/UserAppointment/UserAppointment";

export default function UserActivity({
  authenticated,
  userName,
  userId,
  setAuthenticated,
}) {
  const [userAppointment, setUserAppointment] = useState([]);
  const token = localStorage.getItem("gateManagementApi");
  useEffect(() => {
    const handleAppointmentData = () => {
      api
        .get(`/users/${userId}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserAppointment([...response.data.user.appointments]);
        })
        .catch((err) => {
          console.log(err.response);
        });
    };
    handleAppointmentData();
  }, [token, userId]);

  return (
    <>
      <NavBar
        authenticated={authenticated}
        userName={userName}
        userId={userId}
        setAuthenticated={setAuthenticated}
      />
      <UserAppointment userAppointment={userAppointment} />
    </>
  );
}
