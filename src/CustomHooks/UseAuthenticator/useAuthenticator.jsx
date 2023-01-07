import { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

function useAuthenticator() {
  const [authenticated, setAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRole, setUserRole] = useState("");
  const token = localStorage.getItem("gateManagementApi");

  useEffect(() => {
    if (token) {
      const decode = jwtDecode(token);
      const currentTime = new Date().getTime() / 1000;
      if (decode.exp > currentTime) {
        setAuthenticated(true);
        setUserName(decode.user_name);
        setUserId(decode.user_id);
        setUserEmail(decode.user_email);
        setUserRole(decode.role);
      } else {
        setAuthenticated(false);
        setUserName(null);
      }
    } else {
      setAuthenticated(false);
      setUserName("");
      setUserId("");
      setUserEmail("");
      setUserRole("");
    }
  }, [authenticated, token, userName, userId, userEmail, userRole]);

  return {
    authenticated,
    userName,
    userId,
    userRole,
    setAuthenticated,
  };
}
export default useAuthenticator;
