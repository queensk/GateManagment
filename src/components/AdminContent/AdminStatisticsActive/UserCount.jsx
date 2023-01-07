import React, { useEffect, useState } from "react";
import api from "../../../api/api";
import "./AdminStatisticsActive.css";
import {
  BsPeopleFill,
  BsFillCalendarWeekFill,
  BsAlarmFill,
  BsFillCalendarXFill,
} from "react-icons/bs";

export default function UserCount() {
  const [userCount, setUserCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [availableUsers, setAvailableUsers] = useState(0);
  const [notAvailableUsers, setNotAvailableUsers] = useState(0);
  const token = localStorage.getItem("gateManagementApi");
  const header = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await api.get("/users/", header);
        const appointmentsData = await api.get(
          "/visitor_appointments/",
          header
        );
        const countAvailableUsers = userData.data.users.filter(
          (item) => item.availability === true
        ).length;
        const countNotAvailableUsers = userData.data.users.filter(
          (item) => item.availability === false
        ).length;
        setAvailableUsers(countAvailableUsers);
        setUserCount(userData.data.users.length);
        setAppointmentCount(appointmentsData.data.user_appointments.length);
        setNotAvailableUsers(countNotAvailableUsers);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="AdminStatisticsContainer">
      <div className="user-count">
        <BsPeopleFill />
        <p>Users</p>
        <div className="user-count-animation">
          <span>{userCount}</span>
        </div>
      </div>
      <div className="user-count">
        <BsFillCalendarWeekFill />
        <p>Appointments</p>
        <div className="user-count-animation">
          <span>{appointmentCount}</span>
        </div>
      </div>
      <div className="user-count">
        <BsAlarmFill />
        <p>Available user</p>
        <div className="user-count-animation">
          <span>{availableUsers}</span>
        </div>
      </div>
      <div className="user-count">
        <BsFillCalendarXFill />
        <p>Unavailable user</p>
        <div className="user-count-animation">
          <span>{notAvailableUsers}</span>
        </div>
      </div>
    </div>
  );
}
