import React from "react";
import "./UserAppointment.css";

export default function UserAppointment({ userAppointment }) {
  return (
    <div className="userAppointmentContainer">
      <div className="userAppointmentContainer marginTop">
        {userAppointment
          .slice()
          .reverse()
          .map((data, index) => (
            <div className="data-display" key={index}>
              <p>
                Create Time:
                <span className="visitor-data">{data.create_time}</span>
              </p>
              <p>
                First Name:
                <span className="visitor-data">{data.first_name}</span>
              </p>
              <p>
                Last Name:
                <span className="visitor-data">{data.last_name}</span>
              </p>
              <p>
                Email:
                <span className="visitor-data">{data.user_email}</span>
              </p>
              <p>
                Reason for Visit:
                <span className="visitor-data">{data.reason_for_visit}</span>
              </p>
              <p>
                Terms Signature Name:
                <span className="visitor-data">
                  {data.terms_signature_name}
                </span>
              </p>
            </div>
          ))}
      </div>
    </div>
  );
}
