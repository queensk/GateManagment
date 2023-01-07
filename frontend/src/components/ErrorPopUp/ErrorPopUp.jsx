import React, { useState } from "react";
import { BsXLg } from "react-icons/bs";
import "./ErrorPopUp.css";

export default function ErrorPopUp({ message, setError }) {
  const handleClose = () => {
    setError("");
  };

  return (
    <div className="error-message">
      <p>{message}</p>
      <BsXLg onClick={handleClose} />
    </div>
  );
}
