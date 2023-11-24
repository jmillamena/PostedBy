import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Logout = () => {
  const history = useHistory();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem("access_token");

      if (accessToken) {
        await axios.post(
          "http://127.0.0.1:5555/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user_name");
        localStorage.removeItem("user_id");

        // Redirect to the login page
        history.push("/login");
      } else {
        console.log("User is not logged in");
      }
    } catch (error) {
      console.error("Logout error", error);
    }
  };

  return (
    <div>
      <p>Your component content</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;
