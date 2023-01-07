import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

export default function AdminContentSuccessPopUp({ editUserItem, setSuccess }) {
  const handleClearButton = (e) => {
    setSuccess(false);
  };
  return (
    <div className="overlay">
      <div className="popup">
        <BsCheckCircleFill />
        <p className="content">Successfully edit</p>
        <p>
          Name:
          {editUserItem?.name}
        </p>
        <p>
          Email:
          {editUserItem?.email}
        </p>
        <p />
        <button
          className="appointmentButton"
          onClick={(e) => {
            handleClearButton();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
