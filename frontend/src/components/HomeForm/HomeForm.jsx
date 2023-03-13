import React, { useState } from "react";
import { GateUserInput, SearchableInput, AgreeToTerms } from "../GateUserInput";
import "./HomeForm.css";
import api from "../../api/api";
import AppointmentSuccessPop from "../AppointmentSuccessPopUp/AppointmentSuccessPop";
import ErrorPopUp from "../ErrorPopUp/ErrorPopUp";

export default function HomeForm() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userVisitPerson, setUserVisit] = useState("");
  const [userVisitPersonId, setUserVisitId] = useState("");
  const [visitReason, setUserVisitReason] = useState("");
  const [searchWorker, setSearchWork] = useState([]);
  const [termsSignatureName, setTermsSignature] = useState("");
  const [successAppointment, setSuccessAppointment] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      user_email: userEmail,
      to_visit_id: userVisitPersonId,
      reason_for_visit: visitReason,
      terms_signature_name: termsSignatureName,
    };

    api
      .post("/visitor_appointments/", data)
      .then((response) => {
        console.log();
        if (response?.status === 201) {
          setFirstName("");
          setLastName("");
          setUserEmail("");
          setUserVisit("");
          setUserVisitReason("");
          setTermsSignature("");
          setSuccessAppointment(true);
        }
      })
      .catch((err) => {
        setError(err.request.response);
      });
  };

  return (
    <div className="appointmentContainer">
      {error && <ErrorPopUp message={error} setError={setError} />}
      <form className="appointmentForm" onSubmit={handleSubmit}>
        <div className="appointmentHeader">
          <h2>Appointment Registration</h2>
        </div>
        <GateUserInput
          label="First Name"
          type="text"
          name="firstName"
          placeholder="Dennis"
          value={firstName}
          setValue={setFirstName}
        />
        <GateUserInput
          label="Last Name"
          type="text"
          name="lastName"
          placeholder="Gitonga"
          value={lastName}
          setValue={setLastName}
        />
        <GateUserInput
          label="Your Email"
          type="email"
          name="lastName"
          placeholder="Gitonga@gmail.com"
          value={userEmail}
          setValue={setUserEmail}
        />
        <SearchableInput
          userVisitPerson={userVisitPerson}
          setUserVisit={setUserVisit}
          setUserVisitId={setUserVisitId}
          options={searchWorker}
          setSearchWork={setSearchWork}
        />
        <GateUserInput
          label="Reason for visit"
          type="text"
          name="reasonForVisit"
          placeholder=""
          value={visitReason}
          setValue={setUserVisitReason}
        />
        <AgreeToTerms
          termsSignatureName={termsSignatureName}
          setTermsSignature={setTermsSignature}
        />
        <input
          className="formSubmitButton"
          type="submit"
          value="Sent Appointment"
        />
      </form>
      {successAppointment && (
        <AppointmentSuccessPop setSuccessAppointment={setSuccessAppointment} />
      )}
    </div>
  );
}
