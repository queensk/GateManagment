import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import "./AppointmentSuccessPop.css";

export default function AppointmentSuccessPop({ setSuccessAppointment }) {
  const handleClearButton = (e) => {
    setSuccessAppointment(false);
  };
  return (
    <div className="overlay">
      <div className="popup">
        <BsCheckCircleFill />
        <p className="content">
          Thank you for submitting your appointment request. Have a nice day!
        </p>
        <button className="appointmentButton" onClick={handleClearButton}>
          OK
        </button>
      </div>
    </div>
  );
}
