import React from "react";
import GateUserInput from "./GateUserInput";

export default function AgreeToTerms({
  termsSignatureName,
  setTermsSignature,
}) {
  return (
    <>
      <span>Enter name to Agree to the Terms of Service</span>
      <GateUserInput
        label=""
        type="text"
        name="name"
        placeholder="Dennis Gitonga"
        value={termsSignatureName}
        setValue={setTermsSignature}
      />
    </>
  );
}
