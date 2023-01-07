import React from "react";
import { BsCheckCircleFill } from "react-icons/bs";

export default function AdminContentSuccessDelete({
  setSuccess,
  deleteUserItem,
  handleUserDelete,
}) {
  const handleClearButton = (e) => {
    setSuccess(false);
  };
  return (
    <div className="overlay">
      <div className="popup">
        <BsCheckCircleFill />
        <p className="content">Are You you want to delete User</p>
        <p>
          Name:
          {deleteUserItem?.name}
        </p>
        <p>
          Email:
          {deleteUserItem?.email}
        </p>
        <p />
        <button
          className="appointmentButton"
          onClick={(e) => {
            handleClearButton();
            handleUserDelete();
          }}
        >
          OK
        </button>
      </div>
    </div>
  );
}
